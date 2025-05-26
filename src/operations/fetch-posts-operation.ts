import { scheduler } from "timers/promises";
import { getPostById, markPostAsProcessed, setPost } from "../lib/db/posts";
import { CombinedPost } from "../lib/db/schemas/posts";
import { groupPosts } from "../lib/facebook/group-posts-generator";
import {
	ExtractedPostDetails,
	extractPostDetails,
} from "../lib/llm/extract-post-details";
import { sendPostToTelegram } from "../lib/telegram/send-post";
import { downloadFile } from "../lib/fs/download-file";
import { GroupFeedPost } from "../lib/facebook/group-feed-extractor";
import { Browser } from "rebrowser-puppeteer";

async function savePost(
	post: GroupFeedPost,
	extractedDetails: ExtractedPostDetails
): Promise<CombinedPost> {
	const combinedPost: CombinedPost = {
		...post,
		...extractedDetails,
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

const MAX_NEW_POSTS = 30;
const MAX_POSTS = 50; // Maximum number of posts to process

const MAX_POST_AGE = 1000 * 60 * 60 * 24 * 60; // about 2 months
export async function fetchPostsOperation(groupId: string, browserInstance: Browser) {
	const posts = groupPosts(groupId, browserInstance);

	let postCount = 0;
	let newPostsCount = 0;
	let existingPostsCount = 0;

	for await (const post of posts) {
		if (newPostsCount >= MAX_NEW_POSTS) break;
		if (postCount >= MAX_POSTS) break;
		postCount++;

		try {
			if (!post.text && !post.childrenIds) {
				console.log(
					`Skipping post ${post.postId} due to missing text and childrenIds`
				);
				continue;
			}
            if(post.creationTime && post.creationTime < Date.now() - MAX_POST_AGE) {
                console.log(`Skipping post ${post.postId} due to age: ${post.creationTime}`);
                continue;
            }
			console.log(`Processing post ${post.postId}...`);
			// Check if the post already exists in the database
			const existingPost = await getPostById(post.postId);

			if (existingPost) {
				console.log(`Post already exists in database: ${post.postId}`);
				continue;
			}
			// Post doesn't exist, extract details and save to database
			const postDetails = await extractPostDetails(post);

			for (const childPost of post.children || []) {
				await savePost(childPost, postDetails);
			}
			await savePost(post, postDetails);

			if (!postDetails.isHouseRentalListing) {
				// save for future reference, but do not send to Telegram
				console.log(
					`Post ${post.postId} is not a house rental listing, skipping...`,
					postDetails,
					post
				);
				continue;
			}

			const success = await sendPostToTelegram(
				(await getPostById(post.postId))!
			);

			if (success) {
				// Update the processedAt timestamp
				await markPostAsProcessed(post.postId);
                await Promise.all(
                    post.childrenIds?.map((childId) => markPostAsProcessed(childId)) || []
                );
			}
			newPostsCount++;
		} catch (error) {
			console.error(`Error processing post ${post.postId}:`, error);
		}

		await scheduler.wait(1000); // Wait for 1 second between posts to avoid rate limits
	}

	console.log(
		`Processing complete: ${postCount} posts processed, ${newPostsCount} new posts saved, ${existingPostsCount} existing posts skipped.`
	);
}
