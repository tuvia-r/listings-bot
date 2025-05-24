import { scheduler } from "timers/promises";
import { getPostById, markPostAsProcessed, setPost } from "../lib/db/posts";
import { CombinedPost } from "../lib/db/schemas/posts";
import { groupPosts } from "../lib/facebook";
import { extractPostDetails } from "../lib/gemini/extract-post-details";
import { sendPostToTelegram } from "../lib/telegram/send-post";

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
            // Check if the post already exists in the database
            const existingPost = await getPostById(post.postId);

            if (!existingPost) {
                // Post doesn't exist, extract details and save to database
                const postDetails = await extractPostDetails(post);

                if(!postDetails.isHouseRentalListing) {
                    console.log(`Post ${post.postId} is not a house rental listing, skipping...`);
                    continue;
                }

                // Merge post data with extracted details
                const combinedPost: CombinedPost = {
                    ...post,
                    ...postDetails
                };

                // Save to database
                await setPost(combinedPost);
                console.log(`New post saved: ${post.postId}`, combinedPost);


                 const success = await sendPostToTelegram(post);
                        
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