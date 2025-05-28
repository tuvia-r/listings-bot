import { client } from './client';
import { and, eq } from 'drizzle-orm';
import { postsTable, CombinedPost, postToDbRecord, PostProcessingStatus, PostToPostTable } from './schemas/posts';
import { ListingType, PropertyType, RentalType } from '../llm/extract-post-details';
import { getLogger } from '../../utils/logger';

const logger = getLogger('posts-db');

const FILTERS = [
    eq(postsTable.propertyType, PropertyType.House), // Only get house posts
    eq(postsTable.listingType, ListingType.Rental), // Only get rental listings
    eq(postsTable.rentalType, RentalType.LongTerm), // Only get long-term rentals
    eq(postsTable.isMarkedAsIrelevant, false), // Only get posts that are pending processing
];

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
    return post;
}

/**
 * Insert a new post or update if it already exists
 */
export async function setPost(post: CombinedPost): Promise<void> {
    try {
        const dbRecord = postToDbRecord(post);

        await client
            .insert(postsTable)
            .values(dbRecord)
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

        logger.info(`Post ${post.postId} successfully saved to database`);
    } catch (error) {
        logger.error('Error setting post:', error, post);
        throw error;
    }
}

/**
 * Delete a post by its Facebook postId
 */
export async function deletePost(postId: string): Promise<boolean> {
    try {
        const result = await client.delete(postsTable).where(eq(postsTable.postId, postId));

        return result.changes > 0;
    } catch (error) {
        logger.error('Error deleting post:', error);
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
                ...FILTERS, // Apply filters for property type, listing type, and rental type
            ),
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
        });
        return unprocessedPosts
            .filter((post) => !post?.parentPosts?.length) // Only return top-level posts
            .filter((post) => !post.childPosts || post.childPosts.every((child) => child.childPost.processingStatus === PostProcessingStatus.Pending));
    } catch (error) {
        logger.error('Error getting unprocessed posts:', error);
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

        logger.info(`Post ${postId} marked as processed`);
    } catch (error) {
        logger.error('Error marking post as processed:', error);
        throw error;
    }
}
