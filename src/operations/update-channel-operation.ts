import { sendPostToTelegram } from '../lib/telegram/send-post';
import { getUnprocessedPosts, markPostAsProcessed } from '../lib/db/posts';

export async function updateChannelWithNewPosts() {
  try {
    console.log('Fetching unprocessed listings from database...');
    
    // Get all posts where processedAt is null
    const unprocessedPosts = await getUnprocessedPosts();
    
    console.log(`Found ${unprocessedPosts.length} unprocessed listings`);
    
    if (unprocessedPosts.length === 0) {
      return 0;
    }
    
    let processedCount = 0;
    
    // Process each post
    for (const post of unprocessedPosts) {
      try {
        console.log(`Sending post ${post.postId} to Telegram...`, post);
        
        // Send to Telegram
        const success = await sendPostToTelegram(post);
        
        if (success) {
          // Update the processedAt timestamp
          await markPostAsProcessed(post.postId);
          
          console.log(`Post ${post.postId} successfully processed and sent to Telegram`);
          processedCount++;
          
          // Add a small delay between sends to avoid hitting Telegram rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.error(`Failed to send post ${post.postId} to Telegram`);
        }
      } catch (error) {
        console.error('Error processing post:', error);
        // Continue with the next post even if this one fails
      }
    }
    
    console.log(`Successfully processed ${processedCount} out of ${unprocessedPosts.length} posts`);
    return processedCount;
  } catch (error) {
    console.error('Error processing unprocessed listings:', error);
    throw error;
  }
}