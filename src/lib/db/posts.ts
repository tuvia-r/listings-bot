import { client } from "./client";
import { and, eq } from "drizzle-orm";
import {
	postsTable,
	CombinedPost,
	dbRecordToPost,
	postToDbRecord,
	PostProcessingStatus,
	PostToPostTable,
} from "./schemas/posts";

/**
 * Get a post by its Facebook postId
 */
export async function getPostById(postId: string) {
	const post = await client.query.postsTable.findFirst({
		with: {
			childPosts: {
				with: {
					childPost: true,
				},
			},
			parentPosts: {
				with: {
					parentPost: true,
				},
			},
		},
		where: eq(postsTable.postId, postId),
	});
	return dbRecordToPost(post!);
}

/**
 * Insert a new post or update if it already exists
 */
export async function setPost(post: CombinedPost): Promise<void> {
	try {
		const dbRecord = postToDbRecord(post);

		await client
			.insert(postsTable)
			.values(dbRecord as any) // Cast to any to avoid type issues
			.onConflictDoUpdate({
				target: postsTable.postId,
				set: {
					...dbRecord,
					updatedAt: Date.now(),
				},
			});

		if (post.childrenIds && post.childrenIds.length > 0) {
			for (const childId of post.childrenIds) {
				await client
					.insert(PostToPostTable)
					.values({
						parentPostId: post.postId,
						childPostId: childId,
					})
					.onConflictDoNothing();
			}
		}

		console.log(`Post ${post.postId} successfully saved to database`);
	} catch (error) {
		console.error("Error setting post:", error, post);
		throw error;
	}
}

/**
 * Delete a post by its Facebook postId
 */
export async function deletePost(postId: string): Promise<boolean> {
	try {
		const result = await client
			.delete(postsTable)
			.where(eq(postsTable.postId, postId));

		return result.changes > 0;
	} catch (error) {
		console.error("Error deleting post:", error);
		throw error;
	}
}

/**
 * Get all posts that have not been processed yet (processedAt is null)
 */
export async function getUnprocessedPosts() {
	try {
		const unprocessedPosts = await client.query.postsTable.findMany({
			where: and(
				eq(postsTable.processingStatus, PostProcessingStatus.Pending),
				eq(postsTable.isHouseRentalListing, 1)
			),
			with: {
				childPosts: {
					//@ts-ignore
					with: {
						childPost: true,
					},
				},
				parentPosts: {
					with: {
						parentPost: true,
					},
				},
			},
		});
		return unprocessedPosts
			.map(dbRecordToPost)
			.filter((post) => !post?.parentPosts?.length)
			.filter(
				(post) =>
					!post?.childPosts?.length ||
					post?.childPosts?.every(
						(child: any) =>
							child.processingStatus ===
							PostProcessingStatus.Pending
					)
			);
	} catch (error) {
		console.error("Error getting unprocessed posts:", error);
		throw error;
	}
}

/**
 * Mark a post as processed by setting the processedAt timestamp
 */
export async function markPostAsProcessed(postId: string): Promise<void> {
	try {
		await client
			.update(postsTable)
			.set({
				processingStatus: PostProcessingStatus.Processed,
				updatedAt: Date.now(), // Changed to use Date.now() for consistency
			})
			.where(eq(postsTable.postId, postId));

		console.log(`Post ${postId} marked as processed`);
	} catch (error) {
		console.error("Error marking post as processed:", error);
		throw error;
	}
}
