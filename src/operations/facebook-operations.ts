import { getLogger } from '../utils/logger';
import { getPostById } from '../lib/db/posts';
import { extractPostDetails } from '../lib/llm/extract-post-details';
import { GroupFeedPost } from '../lib/facebook/group-feed-extractor';
import { MAX_POST_AGE } from '../utils/consts';
import { savePost } from './post-operations';
import { notificationsQueue } from '../lib/queues/notification-queue';

const logger = getLogger('facebook-operations');

export async function onFacebookPost(post: GroupFeedPost) {
    if (!post.text && !post.childrenIds) {
        logger.info(`Skipping post ${post.postId} due to missing text and childrenIds`);
        return;
    }
    if (post.creationTime && post.creationTime < Date.now() - MAX_POST_AGE) {
        logger.info(`Skipping post ${post.postId} due to age: ${new Date(post.creationTime)}`);
        return;
    }
    logger.info(`Processing post ${post.postId}...`);
    // Check if the post already exists in the database
    const existingPost = await getPostById(post.postId);

    if (existingPost) {
        logger.info(`Post already exists in database: ${post.postId}`);
        return;
    }
    // Post doesn't exist, extract details and save to database
    const postDetails = await extractPostDetails(post);

    for (const childPost of post.children || []) {
        await savePost(childPost, postDetails);
    }
    await savePost(post, postDetails);
    await notificationsQueue.push(post.postId);
}
