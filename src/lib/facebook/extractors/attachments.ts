import { Browser } from 'rebrowser-puppeteer';
import { FacebookPost } from '../utils/graphql';
import { extractImageFromFacebookPost } from './image';
import { extractVideoFromFacebookPost } from './video';

/**
 * Extract media attachments from post
 */
export async function extractMediaAttachments(post: FacebookPost, attachments: any[], browser: Browser): Promise<void> {
    post.postImages = post.postImages ?? [];
    post.postVideos = post.postVideos ?? [];
    post.postLinks = post.postLinks ?? [];
    post.attachments = post.attachments ?? [];

    // Keep track of processed media to avoid duplicates
    const processedMediaIds = new Set<string>();

    for (const attachment of attachments) {
        // Skip empty attachments
        if (!attachment) continue;

        // Add the raw attachment object for reference
        post.attachments.push(attachment);

        // Track photo IDs - when we get an attachment id, we'll create the full URL
        if (attachment.__typename === "Photo" && attachment.id && !processedMediaIds.has(attachment.id)) {
            processedMediaIds.add(attachment.id);
            const photoUrl = await extractImageFromFacebookPost(browser, `https://www.facebook.com/photo/?fbid=${attachment.id}`);
            if (photoUrl) {
                post.postImages.push(photoUrl);
            }
        }

        // Track video IDs
        if (attachment.__typename === "Video" && attachment.id && !processedMediaIds.has(attachment.id)) {
            processedMediaIds.add(attachment.id);
            const videoUrl = await extractVideoFromFacebookPost(browser, `https://www.facebook.com/watch/?v=${attachment.id}`);
            if (videoUrl) {
                post.postVideos.push(videoUrl);
            }
        }

        // Handle generic attachments
        if (attachment.__typename === "GenericAttachmentMedia" && attachment.id && !processedMediaIds.has(attachment.id)) {
            processedMediaIds.add(attachment.id);
            const attachmentUrl = `https://www.facebook.com/attachments/${attachment.id}`;
            post.postLinks.push(attachmentUrl);
        }

        // Handle direct media field
        if (attachment.media) {
            // Handle both single media object and array of media objects
            const mediaItems = Array.isArray(attachment.media) ? attachment.media : [attachment.media];

            for (const media of mediaItems) {
                if (!media) continue;

                // Extract image URLs
                if (media.__typename === 'Photo' && media.id && !processedMediaIds.has(media.id)) {
                    processedMediaIds.add(media.id);
                    // Create Facebook photo URL
                    const photoUrl = await extractImageFromFacebookPost(browser, `https://www.facebook.com/photo/?fbid=${media.id}`);
                    if (photoUrl) {
                        post.postImages.push(photoUrl);
                    }
                }

                // Extract image from media.image
                if (media.image?.uri) {
                    post.postImages.push(media.image.uri);
                }

                // Extract from viewer_image if available
                if (media.viewer_image?.uri) {
                    post.postImages.push(media.viewer_image.uri);
                }

                // Extract direct image source
                if (media.media?.image?.src) {
                    post.postImages.push(media.media.image.src);
                }

                // Extract video URLs
                if (media.__typename === 'Video' && media.id && !processedMediaIds.has(media.id)) {
                    processedMediaIds.add(media.id);
                    // Create Facebook video URL
                    const videoUrl = await extractVideoFromFacebookPost(browser, `https://www.facebook.com/watch/?v=${media.id}`);
                    if (videoUrl) {
                        post.postVideos.push(videoUrl);
                    }
                }

                // Extract media source for videos
                if (media.media?.source) {
                    post.postVideos.push(media.media.source);
                }

                // Extract link URLs
                if ((media.type === 'link' || media.__typename === 'ExternalUrl') && media.url) {
                    post.postLinks.push(media.url);
                }

                // Handle subattachments (e.g., photo albums)
                if (media.subattachments?.data) {
                    for (const subMedia of media.subattachments.data) {
                        if (!subMedia) continue;

                        if (subMedia.__typename === 'Photo' && subMedia.id && !processedMediaIds.has(subMedia.id)) {
                            processedMediaIds.add(subMedia.id);
                            const photoUrl = await extractImageFromFacebookPost(browser, `https://www.facebook.com/photo/?fbid=${subMedia.id}`);
                            if (photoUrl) {
                                post.postImages.push(photoUrl);
                            }
                        }

                        if (subMedia.media?.image?.src) {
                            post.postImages.push(subMedia.media.image.src);
                        }

                        if (subMedia.__typename === 'Video' && subMedia.id && !processedMediaIds.has(subMedia.id)) {
                            processedMediaIds.add(subMedia.id);
                            const videoUrl = await extractVideoFromFacebookPost(browser, `https://www.facebook.com/watch/?v=${subMedia.id}`);
                            if (videoUrl) {
                                post.postVideos.push(videoUrl);
                            }
                        }

                        if (subMedia.media?.source) {
                            post.postVideos.push(subMedia.media.source);
                        }

                        if (subMedia.type === 'link' && subMedia.url) {
                            post.postLinks.push(subMedia.url);
                        }
                    }
                }
            }
        }

        // Handle all_subattachments for direct attachments
        if (attachment.all_subattachments?.nodes) {
            for (const node of attachment.all_subattachments.nodes) {
                if (!node) continue;

                if (node.media) {
                    if (node.media.__typename === 'Photo' && node.media.id && !processedMediaIds.has(node.media.id)) {
                        processedMediaIds.add(node.media.id);
                        const photoUrl = await extractImageFromFacebookPost(browser, `https://www.facebook.com/photo/?fbid=${node.media.id}`);
                        if (photoUrl) {
                            post.postImages.push(photoUrl);
                        }
                    }
                    else if (node.media.__typename === 'Video' && node.media.id && !processedMediaIds.has(node.media.id)) {
                        processedMediaIds.add(node.media.id);
                        const videoUrl = await extractVideoFromFacebookPost(browser, `https://www.facebook.com/watch/?v=${node.media.id}`);
                        if (videoUrl) {
                            post.postVideos.push(videoUrl);
                        }
                    }

                    // Extract image URIs
                    if (node.media.image?.uri) {
                        post.postImages.push(node.media.image.uri);
                    }
                    if (node.media.viewer_image?.uri) {
                        post.postImages.push(node.media.viewer_image.uri);
                    }
                }

                // Include direct URLs from nodes if available
                if (node.url) {
                    post.postLinks.push(node.url);
                }
            }
        }
    }

    // Remove duplicates
    if (post.postImages?.length) {
        post.postImages = [...new Set(post.postImages)];
    }
    if (post.postVideos?.length) {
        post.postVideos = [...new Set(post.postVideos)];
    }
    if (post.postLinks?.length) {
        post.postLinks = [...new Set(post.postLinks)];
    }
}