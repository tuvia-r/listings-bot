import { scheduler } from "timers/promises";
import { getPostById, setPost } from "../lib/db/posts";
import { CombinedPost } from "../lib/db/schemas/posts";
import { groupPosts } from "../lib/facebook/group-posts-generator";
import {
	ExtractedPostDetails,
	extractPostDetails,
} from "../lib/llm/extract-post-details";
import { downloadFile } from "../lib/fs/download-file";
import { GroupFeedPost } from "../lib/facebook/group-feed-extractor";
import { Browser } from "rebrowser-puppeteer";
import ms from "ms";
import { getLogger } from "../utils/logger";
import { MAX_NEW_POSTS, MAX_POST_AGE, MAX_POSTS } from "../utils/consts";

const logger = getLogger("fetch-posts-operation");

async function savePost(
	post: GroupFeedPost,
	extractedDetails: ExtractedPostDetails
){
    const existingPost = await getPostById(post.postId);
	if (existingPost) {
		logger.info(`Post already exists in database: ${post.postId}`);
		return; // Skip saving if the post already exists
	}
	const combinedPost: CombinedPost = {
		...post,
		...extractedDetails,
	};

	// Save attachments
	for (const attachment of post.postAttachments) {
		await downloadFile(attachment.url, attachment.localPath);
	}

	// Save to database
	await setPost(combinedPost);
	logger.info(`New post saved: ${post.postId}`);
}

export async function fetchPostsOperation(groupId: string, browserInstance: Browser) {
	const posts = groupPosts(groupId, browserInstance);

	let postCount = 0;
	let newPostsCount = 0;

	for await (const post of posts) {
		if (newPostsCount >= MAX_NEW_POSTS) break;
		if (postCount >= MAX_POSTS) break;
		postCount++;

		try {
			if (!post.text && !post.childrenIds) {
				logger.info(
					`Skipping post ${post.postId} due to missing text and childrenIds`
				);
				continue;
			}
            if(post.creationTime && post.creationTime < Date.now() - MAX_POST_AGE) {
                logger.info(`Skipping post ${post.postId} due to age: ${new Date(post.creationTime)}`);
                continue;
            }
			logger.info(`Processing post ${post.postId}...`);
			// Check if the post already exists in the database
			const existingPost = await getPostById(post.postId);

			if (existingPost) {
				logger.info(`Post already exists in database: ${post.postId}`);
				continue;
			}
			// Post doesn't exist, extract details and save to database
			const postDetails = await extractPostDetails(post);

			for (const childPost of post.children || []) {
				await savePost(childPost, postDetails);
			}
			await savePost(post, postDetails);

			newPostsCount++;
		} catch (error) {
			logger.error(`Error processing post ${post.postId}:`, error);
		}

		await scheduler.wait(1000); // Wait for 1 second between posts to avoid rate limits
	}

	logger.info(
		`Processing complete: ${postCount} posts processed, ${newPostsCount} new posts saved`
	);
}
