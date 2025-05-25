import { scheduler } from "timers/promises";
import { getPostById, markPostAsProcessed, setPost } from "../lib/db/posts";
import { CombinedPost } from "../lib/db/schemas/posts";
import { groupPosts } from "../lib/facebook/group-posts-generator";
import { ExtractedPostDetails, extractPostDetails } from "../lib/gemini/extract-post-details";
import { sendPostToTelegram } from "../lib/telegram/send-post";
import { downloadFile } from "../lib/fs/download-file";
import { writeFile } from "fs/promises";
import { GroupFeedPost } from "../lib/facebook/group-feed-extractor";


async function savePost(post: GroupFeedPost, extractedDetails: ExtractedPostDetails): Promise<CombinedPost> {
    const combinedPost: CombinedPost = {
        ...post,
        ...extractedDetails
    };

    // Save attachments
    for (const attachment of post.allAttechments) {
        await downloadFile(attachment.url, attachment.localPath);
    }

    // Save to database
    await setPost(combinedPost);
    console.log(`New post saved: ${post.postId}`);

    return combinedPost;
}

const MAX_POSTS = 100;
export async function fetchPostsOperation(groupId: string) {
    const posts = groupPosts(groupId);

    let postCount = 0;
    let newPostsCount = 0;
    let existingPostsCount = 0;

    for await (const post of posts) {
        if (postCount >= MAX_POSTS) break;
        postCount++;

        try {
            if(!post.text && !post.childrenIds) {
                console.log(`Skipping post ${post.postId} due to missing text and childrenIds`);
                continue;
            }
            console.log(`Processing post ${post.postId}...`);
            // Check if the post already exists in the database
            const existingPost = await getPostById(post.postId);

            if (!existingPost) {
                // Post doesn't exist, extract details and save to database
                const postDetails = await extractPostDetails(post);

                if(!postDetails.isHouseRentalListing) {
                    console.log(`Post ${post.postId} is not a house rental listing, skipping...`);
                    continue;
                }

                for (const childPost of post.children || []) {
                    await savePost(childPost, postDetails);
                }
                await savePost(post, postDetails);

                const success = await sendPostToTelegram((await getPostById(post.postId))!);
                        
                if (success) {
                    // Update the processedAt timestamp
                    await markPostAsProcessed(post.postId);
                }
                newPostsCount++;
            } else {
                console.log(`Post already exists: ${post.postId}`);
                existingPostsCount++;
            }
        } catch (error) {
            console.error(`Error processing post ${post.postId}:`, error);
        }

        await scheduler.wait(1000); // Wait for 1 second between posts to avoid rate limits
    }

    console.log(`Processing complete: ${postCount} posts processed, ${newPostsCount} new posts saved, ${existingPostsCount} existing posts skipped.`);
}