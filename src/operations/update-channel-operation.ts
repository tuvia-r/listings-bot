import { sendPostToTelegram } from "../lib/telegram/send-post";
import { getUnprocessedPosts, markPostAsProcessed } from "../lib/db/posts";
import { getLogger } from "../utils/logger";

const logger = getLogger("update-channel-operation");

export async function updateChannelWithNewPosts() {
	try {
		logger.info("Fetching unprocessed listings from database...");

		// Get all posts where processedAt is null
		const unprocessedPosts = await getUnprocessedPosts();

		logger.info(`Found ${unprocessedPosts.length} unprocessed listings`);

		if (unprocessedPosts.length === 0) {
			return 0;
		}

		let processedCount = 0;

		// Process each post
		for (const post of unprocessedPosts) {
			try {
				if (!post || !post.postId) {
					logger.warn("Skipping invalid post:", post);
					continue;
				}
				logger.log(`Sending post ${post.postId} to Telegram...`, post);

				// Send to Telegram
				const success = await sendPostToTelegram(post);

				if (success) {
					// Update the processedAt timestamp
					await markPostAsProcessed(post.postId);

					await Promise.all(
						post.childPosts.map((child) =>
							markPostAsProcessed(child.childPostId)
						) || []
					);

					logger.info(
						`Post ${post.postId} successfully processed and sent to Telegram`
					);
					processedCount++;

					// Add a small delay between sends to avoid hitting Telegram rate limits
					await new Promise((resolve) =>
						setTimeout(resolve, 1000 * 60)
					); // 60 seconds
				} else {
					logger.error(
						`Failed to send post ${post.postId} to Telegram`
					);
				}
			} catch (error) {
				logger.error("Error processing post:", error);
				// Continue with the next post even if this one fails
			}
		}

		logger.info(
			`Successfully processed ${processedCount} out of ${unprocessedPosts.length} posts`
		);
		return processedCount;
	} catch (error) {
		logger.error("Error processing unprocessed listings:", error);
		throw error;
	}
}
