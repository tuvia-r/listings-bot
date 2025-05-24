import { GraphQLResponse, GraphQLNode, CometSections, FacebookComment as FBComment, FacebookPost as FBPost, FacebookAttachment } from "../utils/graphql";
import { extractCommentsFromRaw, extractCommentsFromEdges, extractPostIdFromComments } from "./comments";
import { extractMediaAttachments } from "./attachments";
import { extractEmailFromText } from "../utils/text-utils";
import { extractImageFromFacebookPost } from "./image";
import { extractVideoFromFacebookPost } from "./video";
import { Browser } from "rebrowser-puppeteer";

// Re-exporting the interfaces to maintain compatibility
export type FacebookComment = FBComment;
export type FacebookPost = FBPost;

/**
 * Interface for formatted post output
 */
export interface FormattedFacebookPost {
    postId: string;
    postText: string;
    postAuthor: string;
    postAuthorId: string;
    postAuthorUrl?: string;
    postUrl?: string;
    postDate?: string;
    postImages: string[];
    postVideos: string[];
    postLinks: string[];
    email?: string;
    firstName?: string;
    lastName?: string;
    commentCount: number;
    hasSharedContent: boolean;
    sharedPost?: FormattedFacebookPost;
}

/**
 * Extracts post data from Facebook GraphQL responses and formats it
 */
export async function extractPostData<T extends {data?: any, node?: any, response?: any[], edges?: any[]}>(
    graphqlResponse: GraphQLResponse<T>,
    browser: Browser,
    groupId?: string
): Promise<FormattedFacebookPost[]> {
    const posts: FacebookPost[] = [];
    console.log("Processing GraphQL response for post data");
    
    // Handle the various response shapes Facebook might return
    try {
        // Case 1: Direct data structure
        if (graphqlResponse.data) {
            console.log("Found data property in response");
            const extractedPosts = await extractFromDataProperty(graphqlResponse.data, browser);
            if (extractedPosts.length > 0) {
                posts.push(...extractedPosts);
            }
        }
        
        // Case 2: Response array with data property
        if (graphqlResponse.response && Array.isArray(graphqlResponse.response)) {
            console.log("Found response array property");
            for (const resp of graphqlResponse.response) {
                if (resp && resp.data) {
                    const extractedPosts = await extractFromDataProperty(resp.data, browser);
                    if (extractedPosts.length > 0) {
                        posts.push(...extractedPosts);
                    }
                }
            }
        }
        
        // Case 3: Legacy structure with nodes
        if (graphqlResponse.node || 
            (graphqlResponse.data && typeof graphqlResponse.data === 'object' && 'node' in graphqlResponse.data)) {
            console.log("Found node structure in response");
            const node = graphqlResponse.node || (graphqlResponse.data as any).node;
            const post = await extractPostFromNode(node, browser);
            if (post) {
                await enrichPostWithMetadata(post, browser);
                posts.push(post);
            }
        }
        
        // Case 4: Extract from edges directly
        if (graphqlResponse.edges && Array.isArray(graphqlResponse.edges)) {
            console.log("Found edges array directly in response");
            for (const edge of graphqlResponse.edges) {
                if (edge && edge.node) {
                    const post = await extractPostFromNode(edge.node, browser);
                    if (post) {
                        await enrichPostWithMetadata(post, browser);
                        posts.push(post);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error extracting post data:", error);
    }
    
    // Format all posts to the final output format
    return posts.map(post => formatPost(post, groupId));
}

/**
 * Format a FacebookPost into the desired output format
 */
function formatPost(post: FacebookPost, groupId?: string): FormattedFacebookPost {
    return {
        postId: post.postId,
        postText: post.postText,
        postAuthor: post.postAuthor || '',
        postAuthorId: post.postAuthorId || '',
        postAuthorUrl: post.postAuthorUrl || (post.postAuthorId ? `https://www.facebook.com/${post.postAuthorId}` : undefined),
        postUrl: post.postUrl || (groupId ? `https://www.facebook.com/groups/${groupId}/posts/${post.postId}` : undefined),
        postDate: post.postDate,
        postImages: post.postImages || [],
        postVideos: post.postVideos || [],
        postLinks: post.postLinks || [],
        email: post.email,
        firstName: post.firstName,
        lastName: post.lastName,
        commentCount: post.commentCount || (post.postComments ? post.postComments.length : 0),
        hasSharedContent: Boolean(post.childPosts && post.childPosts.length > 0),
        // Include child post data if this is a shared post
        sharedPost: post.childPosts && post.childPosts.length > 0 ? formatPost(post.childPosts[0]) : undefined
    };
}

/**
 * Extract posts from the data property of a GraphQL response
 */
async function extractFromDataProperty(data: any, browser: Browser): Promise<FacebookPost[]> {
    const posts: FacebookPost[] = [];
    
    // Check if we have data in the expected shape
    if (!data) return posts;
    
    try {
        // Utility function for extracting timestamps
        const extractTimestamp = (timestamp: number | string | undefined): string | undefined => {
            if (!timestamp) return undefined;
            
            // Convert string timestamp to number if needed
            const numericTimestamp = typeof timestamp === 'string' 
                ? parseInt(timestamp, 10) 
                : timestamp;
                
            // Check if we have a valid timestamp
            if (isNaN(numericTimestamp)) return undefined;
            
            // If timestamp is in seconds (UNIX format), convert to milliseconds
            const milliseconds = numericTimestamp < 10000000000 
                ? numericTimestamp * 1000 
                : numericTimestamp;
                
            return new Date(milliseconds).toISOString();
        };
        
        // For deep timestamp searching in objects
        const searchForTimestamps = (obj: any, path: string = ''): string | undefined => {
            if (!obj || typeof obj !== 'object') return undefined;
            
            // List of common timestamp field names
            const timestampFields = [
                'creation_time', 'created_time', 'publish_time', 
                'timestamp', 'updated_time', 'time_created'
            ];
            
            // First check the direct fields
            for (const field of timestampFields) {
                if (obj[field] !== undefined) {
                    const extracted = extractTimestamp(obj[field]);
                    if (extracted) {
                        console.log(`Found timestamp at ${path}.${field}: ${extracted}`);
                        return extracted;
                    }
                }
            }
            
            // Then check metadata arrays which often contain timestamp info
            if (obj.metadata && Array.isArray(obj.metadata)) {
                for (let i = 0; i < obj.metadata.length; i++) {
                    const item = obj.metadata[i];
                    if (item?.story?.creation_time) {
                        const extracted = extractTimestamp(item.story.creation_time);
                        if (extracted) {
                            console.log(`Found timestamp in metadata[${i}].story.creation_time: ${extracted}`);
                            return extracted;
                        }
                    }
                }
            }
            
            return undefined;
        };
        
        // Case 1: Handle node with group_feed
        if (data.node?.group_feed?.edges) {
            console.log("Found group_feed with edges");
            for (const edge of data.node.group_feed.edges) {
                if (!edge.node) continue;
                
                const post = await extractPostFromNode(edge.node, browser);
                if (post) {
                    // If post is missing a timestamp, try to find it in the edge data
                    if (!post.postDate) {
                        // Look for timestamps in the edge data or story
                        post.postDate = 
                            searchForTimestamps(edge.node, 'edge.node') ||
                            searchForTimestamps(edge.node.comet_sections, 'edge.node.comet_sections') ||
                            searchForTimestamps(edge, 'edge');
                    }
                    
                    await enrichPostWithMetadata(post, browser);
                    posts.push(post);
                }
            }
        }
        
        // Case 2: Handle direct node data
        else if (data.node) {
            console.log("Found direct node data");
            const post = await extractPostFromNode(data.node, browser);
            if (post) {
                // If post is missing a timestamp, try to find it in the node data
                if (!post.postDate) {
                    post.postDate = searchForTimestamps(data.node, 'data.node');
                }
                
                await enrichPostWithMetadata(post, browser);
                posts.push(post);
            }
        }
        
        // Case 3: Handle direct group_feed
        else if (data.group_feed?.edges) {
            console.log("Found direct group_feed");
            for (const edge of data.group_feed.edges) {
                if (!edge.node) continue;
                
                const post = await extractPostFromNode(edge.node, browser);
                if (post) {
                    // If post is missing a timestamp, try to find it in the edge data
                    if (!post.postDate) {
                        post.postDate = 
                            searchForTimestamps(edge.node, 'edge.node') ||
                            searchForTimestamps(edge.node.comet_sections, 'edge.node.comet_sections') ||
                            searchForTimestamps(edge, 'edge');
                    }
                    
                    await enrichPostWithMetadata(post, browser);
                    posts.push(post);
                }
            }
        }
        
        // Case 4: Handle story_card
        else if (data.story_card) {
            console.log("Found story_card");
            const post = {
                postId: data.story_card.post_id,
                postText: '',
                postAuthor: '',
                postAuthorId: '',
                postDate: searchForTimestamps(data.story_card, 'data.story_card'),
            };
            if (post.postId) {
                posts.push(post);
            }
        }
        
        // Case 5: Handle feedback with comments
        if (data.feedback?.ufi_renderer?.feedback?.comment_list_renderer?.feedback
            ?.comment_rendering_instance_for_feed_location?.comments?.edges) {
            
            console.log("Found comments in feedback");
            const commentsData = data.feedback.ufi_renderer.feedback.comment_list_renderer.feedback
                .comment_rendering_instance_for_feed_location.comments.edges;
                
            const extractedComments = extractCommentsFromEdges(commentsData);
            
            // If we found comments but no posts, create a temporary post container
            if (extractedComments.length > 0 && posts.length === 0) {
                const postId = extractPostIdFromComments(extractedComments);
                if (postId) {
                    posts.push({
                        postId: postId,
                        postText: '',
                        postAuthor: '',
                        postAuthorId: '',
                        postComments: extractedComments
                    });
                }
            } else if (extractedComments.length > 0 && posts.length > 0) {
                // Add comments to the first post if they share the same postId
                if (posts[0].postId === extractedComments[0].postId) {
                    posts[0].postComments = [...(posts[0].postComments || []), ...extractedComments];
                }
            }
        }
    } catch (error) {
        console.error("Error extracting from data property:", error);
    }
    
    return posts;
}

/**
 * Extract post data from a GraphQL node
 */
async function extractPostFromNode(node: GraphQLNode, browser: Browser): Promise<FBPost | null> {
    if (!node) return null;
    
    console.log("Extracting post from node");
    
    // Initialize a post object with defaults
    let post: FacebookPost = {
        postId: node.post_id || '',
        postText: '',
        postAuthor: '',
        postAuthorId: '',
    };
    
    // Extract post ID from various locations
    if (node.post_id) {
        post.postId = node.post_id;
    }
    
    // Extract post text from various locations
    if (node.message?.text) {
        post.postText = node.message.text;
    }
    
    // Extract post creation time from various locations with additional fallback options
    const extractTimestamp = (timestamp: number | string | undefined): string | undefined => {
        if (!timestamp) return undefined;
        
        // Convert string timestamp to number if needed
        const numericTimestamp = typeof timestamp === 'string' 
            ? parseInt(timestamp, 10) 
            : timestamp;
            
        // Check if we have a valid timestamp
        if (isNaN(numericTimestamp)) return undefined;
        
        // If timestamp is in seconds (UNIX format), convert to milliseconds
        const milliseconds = numericTimestamp < 10000000000 
            ? numericTimestamp * 1000 
            : numericTimestamp;
            
        return new Date(milliseconds).toISOString();
    };

    // Try multiple timestamp fields with fallbacks
    post.postDate = 
        extractTimestamp(node.creation_time) || 
        extractTimestamp(node.created_time) || 
        extractTimestamp(node.publish_time) ||
        extractTimestamp(node.timestamp) || 
        extractTimestamp(node.updated_time); 
    
    // Check for timestamps in story-related fields
    if (!post.postDate && node.story) {
        post.postDate = 
            extractTimestamp(node.story.creation_time) ||
            extractTimestamp(node.story.created_time) ||
            extractTimestamp(node.story.timestamp);
    }
    
    console.log(`Extracted timestamp for post ${post.postId}: ${post.postDate || 'NONE FOUND'}`);
    
    // Extract author information from story_owner if available
    if (node.story_owner) {
        post.postAuthor = node.story_owner.name || '';
        post.postAuthorId = node.story_owner.id || '';
        post.postAuthorUrl = node.story_owner.url || '';
    }
    // Extract author information from actors if available
    else if (node.actors && node.actors.length > 0) {
        post.postAuthor = node.actors[0].name || '';
        post.postAuthorId = node.actors[0].id || '';
        post.postAuthorUrl = node.actors[0].url || '';
    }
    // Extract author information from author field if available
    else if (node.author) {
        post.postAuthor = node.author.name || '';
        post.postAuthorId = node.author.id || '';
        post.postAuthorUrl = node.author.url || '';
    }
    
    // Extract post data from comet_sections if present
    if (node.comet_sections) {
        const cometSectionsPost = await extractPostFromCometSections(node.comet_sections, browser, post.postId);
        if (cometSectionsPost) {
            // Merge the data, keeping existing values if they're not empty
            post = {
                ...post,
                ...cometSectionsPost,
                // Preserve existing values if they're not empty
                postAuthor: post.postAuthor || cometSectionsPost.postAuthor,
                postAuthorId: post.postAuthorId || cometSectionsPost.postAuthorId,
                postAuthorUrl: post.postAuthorUrl || cometSectionsPost.postAuthorUrl,
                postId: post.postId || cometSectionsPost.postId,
                postText: post.postText || cometSectionsPost.postText,
                postDate: post.postDate || cometSectionsPost.postDate,
            };
        }
    }
    
    // Check for attached story that contains post data
    if (node.attached_story) {
        // Store this as a child post and include full child post data
        const childPost = await extractPostFromNode(node.attached_story, browser);
        if (childPost) {
            post.childPosts = [childPost];
            
            // Set the hasSharedContent flag
            post.hasSharedContent = true;
            
            // If our current post is empty, use some of the attached story's data
            if (!post.postText && node.attached_story.message?.text) {
                post.postText = node.attached_story.message.text;
            }
            
            // Get author information from the attached story if missing
            if ((!post.postAuthor || !post.postAuthorId) && node.attached_story.story_owner) {
                post.postAuthor = node.attached_story.story_owner.name || post.postAuthor;
                post.postAuthorId = node.attached_story.story_owner.id || post.postAuthorId;
                post.postAuthorUrl = node.attached_story.story_owner.url || post.postAuthorUrl;
            }
            
            // For child posts, get the date from there if missing in parent
            if (!post.postDate && childPost.postDate) {
                post.postDate = childPost.postDate;
            }
        }
    }
    
    // Check for story card
    if (node.story_card) {
        if (node.story_card.post_id) {
            post.postId = node.story_card.post_id;
        }
        
        if (node.story_card.message?.text) {
            post.postText = node.story_card.message.text;
        }
        
        if (node.story_card.story_owner) {
            post.postAuthor = node.story_card.story_owner.name || post.postAuthor;
            post.postAuthorId = node.story_card.story_owner.id || post.postAuthorId;
            post.postAuthorUrl = node.story_card.story_owner.url || post.postAuthorUrl;
        }
        
        // Try to get creation time from story card
        if (!post.postDate && node.story_card.creation_time) {
            post.postDate = new Date(node.story_card.creation_time * 1000).toISOString();
        }
    }
    
    // Extract comment count if available
    if (node.feedback?.comments?.count !== undefined) {
        post.commentCount = node.feedback.comments.count;
    }
    
    // Extract attachments
    if (node.attachments) {
        await extractMediaAttachments(post, node.attachments, browser);
    }
    
    // Extract email from text
    if (post.postText) {
        post.email = extractEmailFromText(post.postText);
    }
    
    // Return null if we don't have a post ID
    if (!post.postId) {
        return null;
    }
    
    return post;
}

/**
 * Extract post data from comet sections structure
 */
async function extractPostFromCometSections(sections: CometSections, browser: Browser, postId?: string): Promise<FBPost | null> {
    if (!sections || (!sections.content && !sections.feedback)) return null;
    
    // Initialize post with default empty values
    const post: FacebookPost = {
        postId: postId || '',
        postText: '',
        postAuthor: '',
        postAuthorId: '',
    };
    
    // Extract post text - check multiple possible locations
    if (sections.content?.story?.message?.text) {
        post.postText = sections.content.story.message.text;
    } else if (sections.content?.story?.comet_sections?.message?.story?.message?.text) {
        post.postText = sections.content.story.comet_sections.message.story.message.text;
    } else if (sections.content?.story?.comet_sections?.message_container?.story?.message?.text) {
        post.postText = sections.content.story.comet_sections.message_container.story.message.text;
    }
    
    // Extract post author information
    if (sections.content?.story?.comet_sections?.context_layout?.story?.comet_sections?.actor_photo?.story?.actors) {
        const actors = sections.content.story.comet_sections.context_layout.story.comet_sections.actor_photo.story.actors;
        if (actors && actors.length > 0) {
            post.postAuthor = actors[0].name;
            post.postAuthorId = actors[0].id;
            post.postAuthorUrl = actors[0].url;
            
            // Extract first name and last name
            const nameParts = actors[0].name.split(' ');
            post.firstName = nameParts[0];
            post.lastName = nameParts.slice(1).join(' ');
        }
    }
    
    // Extract post ID from feedback section if not provided
    if (!post.postId && sections.feedback?.story?.post_id) {
        post.postId = sections.feedback.story.post_id;
    }
    
    // Extract post date from creation_time with more robust handling
    const extractTimestamp = (timestamp: number | string | undefined): string | undefined => {
        if (!timestamp) return undefined;
        
        // Convert string timestamp to number if needed
        const numericTimestamp = typeof timestamp === 'string' 
            ? parseInt(timestamp, 10) 
            : timestamp;
            
        // Check if we have a valid timestamp
        if (isNaN(numericTimestamp)) return undefined;
        
        // If timestamp is in seconds (UNIX format), convert to milliseconds
        const milliseconds = numericTimestamp < 10000000000 
            ? numericTimestamp * 1000 
            : numericTimestamp;
            
        return new Date(milliseconds).toISOString();
    };

    // Try multiple timestamp fields with fallbacks in comet_sections structure
    if (sections.content?.story) {
        post.postDate = 
            extractTimestamp(sections.content.story.creation_time) ||
            extractTimestamp(sections.content.story.created_time) ||
            extractTimestamp(sections.content.story.timestamp) ||
            extractTimestamp(sections.content.story.publish_time);
    }
    
    // Check metadata sections which often contain timestamps
    if (!post.postDate && sections.content?.story?.comet_sections?.metadata) {
        const metadata = sections.content.story.comet_sections.metadata;
        if (Array.isArray(metadata)) {
            for (const meta of metadata) {
                if (meta?.story?.creation_time) {
                    post.postDate = extractTimestamp(meta.story.creation_time);
                    if (post.postDate) break;
                }
            }
        }
    }
    
    console.log(`CometSections timestamp for post ${post.postId}: ${post.postDate || 'NONE FOUND'}`);
    
    // Extract emails from text
    post.email = extractEmailFromText(post.postText);
    
    // Extract media attachments (images, videos, links)
    if (sections.content?.story?.attachments) {
        await extractMediaAttachments(post, sections.content.story.attachments, browser);
    }
    
    // Check if we have enough data to consider this a valid post
    if (!post.postId) {
        return null;
    }
    
    // Extract comments if available
    if (sections.feedback?.story?.feedback_context?.interesting_top_level_comments) {
        post.postComments = extractCommentsFromRaw(
            sections.feedback.story.feedback_context.interesting_top_level_comments,
            post.postId
        );
    }
    
    return post;
}

/**
 * Add metadata to the post
 */
async function enrichPostWithMetadata(post: FacebookPost, browser: Browser): Promise<void> {
    // Convert URLs to https if they start with http
    if (post.postAuthorUrl && post.postAuthorUrl.startsWith('http:')) {
        post.postAuthorUrl = post.postAuthorUrl.replace('http:', 'https:');
    }
    
    // Create a Facebook profile URL for the author if we have an ID but no URL
    if (post.postAuthorId && !post.postAuthorUrl) {
        post.postAuthorUrl = `https://www.facebook.com/${post.postAuthorId}`;
    }
    
    // Extract first and last name from author name if not already set
    if (post.postAuthor && (!post.firstName || !post.lastName)) {
        const nameParts = post.postAuthor.split(' ');
        if (nameParts.length > 0) {
            post.firstName = nameParts[0];
            post.lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        }
    }

    // Ensure postId is present on comments
    if (post.postComments) {
        post.postComments.forEach(comment => {
            if (!comment.postId && post.postId) {
                comment.postId = post.postId;
            }
        });
    }
    
    // Create a direct link to the post
    if (post.postId && !post.postUrl) {
        post.postUrl = `https://www.facebook.com/groups/1905601096374544/posts/${post.postId}`;
    }
    
    // Process attachments if available
    if (post.attachments && post.attachments.length > 0) {
        for (const attachment of post.attachments) {
            // For Photo attachments, ensure we have the URL in postImages
            if (attachment.__typename === 'Photo' && attachment.id) {
                // Use direct image download URL instead of Facebook photo page
                const photoUrl = await extractImageFromFacebookPost(browser, `https://www.facebook.com/photo/download/?fbid=${attachment.id}`);
                if (!photoUrl) {
                    console.warn(`Failed to extract image URL for attachment ID: ${attachment.id}`);
                    continue;
                }
                if (!post.postImages) {
                    post.postImages = [];
                }
                if (!post.postImages.includes(photoUrl)) {
                    post.postImages.push(photoUrl);
                }
            }
            
            // For Video attachments, ensure we have the URL in postVideos
            else if (attachment.__typename === 'Video' && attachment.id) {
                const videoUrl = await extractVideoFromFacebookPost(browser, `https://www.facebook.com/watch/?v=${attachment.id}`);
                 
                if (!videoUrl) {
                    console.warn(`Failed to extract video URL for attachment ID: ${attachment.id}`);
                    continue;
                }
                
                if (!post.postVideos) {
                    post.postVideos = [];
                }
                if (!post.postVideos.includes(videoUrl)) {
                    post.postVideos.push(videoUrl);
                }
            }
            
            // For GenericAttachmentMedia, add a link
            else if (attachment.__typename === 'GenericAttachmentMedia' && attachment.id) {
                const attachmentUrl = attachment.url || 
                                    attachment.media?.url ||
                                    `https://www.facebook.com/attachments/${attachment.id}`;
                                    
                if (!post.postLinks) {
                    post.postLinks = [];
                }
                if (!post.postLinks.includes(attachmentUrl)) {
                    post.postLinks.push(attachmentUrl);
                }
            }
        }
    }
}