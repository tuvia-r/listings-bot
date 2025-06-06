import { getLogger } from "../utils/logger";
import { getPostById, setPost } from '../lib/db/posts';
import { CombinedPost } from '../lib/db/schemas/posts';
import { ExtractedPostDetails } from '../lib/llm/extract-post-details';
import { downloadFile } from '../lib/fs/download-file';
import { GroupFeedPost } from '../lib/facebook/group-feed-extractor';

const logger = getLogger('post-operations');


export async function savePost(post: GroupFeedPost, extractedDetails: ExtractedPostDetails) {
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