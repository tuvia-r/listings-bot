import { client } from './client';
import { eq, sql } from 'drizzle-orm';
import { postsTable, CombinedPost, postToDbRecord, dbRecordToPost } from './schemas/posts';
import { sendPostToTelegram } from '../telegram/send-post';

/**
 * Get a post by its Facebook postId
 */
export async function getPostById(postId: string): Promise<CombinedPost | null> {
  try {
    const results = await client
      .select()
      .from(postsTable)
      .where(eq(postsTable.postId, postId))
      .limit(1);
    
    if (results.length === 0) {
      return null;
    }
    
    return dbRecordToPost(results[0]) ;
  } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
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
          updatedAt: new Date().toISOString(),
        }
      });
      
    console.log(`Post ${post.postId} successfully saved to database`);
  } catch (error) {
    console.error('Error setting post:', error);
    throw error;
  }
}

/**
 * Update an existing post with new data
 */
export async function updatePost(postId: string, updates: Partial<CombinedPost>): Promise<void> {
  try {
    // Convert updates to database record format
    const updateRecord: any = {};
    
    // Handle arrays and objects that need to be stringified
    if (updates.postImages) updateRecord.postImages = JSON.stringify(updates.postImages);
    if (updates.postVideos) updateRecord.postVideos = JSON.stringify(updates.postVideos);
    if (updates.postLinks) updateRecord.postLinks = JSON.stringify(updates.postLinks);
    if (updates.sharedPost) updateRecord.sharedPost = JSON.stringify(updates.sharedPost);
    if (updates.phoneNumbers) updateRecord.phoneNumbers = JSON.stringify(updates.phoneNumbers);
    
    // Copy all other properties
    for (const [key, value] of Object.entries(updates)) {
      if (!['postImages', 'postVideos', 'postLinks', 'sharedPost', 'phoneNumbers'].includes(key)) {
        // Convert camelCase to snake_case for database columns
        const dbKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        updateRecord[dbKey] = value;
      }
    }
    
    // Add updated timestamp
    updateRecord.updated_at = new Date().toISOString();
    
    await client
      .update(postsTable)
      .set(updateRecord)
      .where(eq(postsTable.postId, postId));
      
    console.log(`Post ${postId} successfully updated`);
  } catch (error) {
    console.error('Error updating post:', error);
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
    console.error('Error deleting post:', error);
    throw error;
  }
}

/**
 * Get posts summary stats (total count, price averages, etc.)
 */
export async function getPostsStats(): Promise<{
  totalPosts: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  cityCounts: Record<string, number>;
}> {
  try {
    const totalResult = await client
      .select({ count: sql`count(*)` })
      .from(postsTable);
    
    const priceResult = await client
      .select({
        avg: sql`avg(${postsTable.price})`,
        min: sql`min(${postsTable.price})`,
        max: sql`max(${postsTable.price})`
      })
      .from(postsTable)
      .where(sql`${postsTable.price} IS NOT NULL`);
    
    const cityCountsResult = await client
      .select({
        city: postsTable.city,
        count: sql`count(*)`
      })
      .from(postsTable)
      .where(sql`${postsTable.city} IS NOT NULL`)
      .groupBy(postsTable.city);
    
    const cityCounts: Record<string, number> = {};
    for (const row of cityCountsResult) {
      if (row.city) {
        cityCounts[row.city] = Number(row.count);
      }
    }
    
    return {
      totalPosts: Number(totalResult[0].count),
      averagePrice: Number(priceResult[0].avg || 0),
      minPrice: Number(priceResult[0].min || 0),
      maxPrice: Number(priceResult[0].max || 0),
      cityCounts
    };
  } catch (error) {
    console.error('Error getting posts stats:', error);
    throw error;
  }
}

/**
 * Get all posts that have not been processed yet (processedAt is null)
 */
export async function getUnprocessedPosts(): Promise<CombinedPost[]> {
  try {
    // const unprocessedPosts = await client
    //   .select()
    //   .from(postsTable)
    //   .where(sql`${postsTable.processedAt} IS NULL`);

    const unprocessedPosts = await client
      .query.postsTable.findMany({
        where: (postsTable, { isNull }) => isNull(postsTable.processedAt),
      })
    
    return unprocessedPosts.map(dbRecordToPost);
  } catch (error) {
    console.error('Error getting unprocessed posts:', error);
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
        processedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .where(eq(postsTable.postId, postId));
    
    console.log(`Post ${postId} marked as processed`);
  } catch (error) {
    console.error('Error marking post as processed:', error);
    throw error;
  }
}
