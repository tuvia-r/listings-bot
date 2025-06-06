import { compact } from 'lodash-es';
import { getPostById } from '../lib/db/posts';
import { formatPostMessage } from '../lib/telegram/send-post';
import { getLogger } from '../utils/logger';
import { sendMessageWithAttachments } from '../lib/telegram/bot';
import { generatePostStaticMapAttachment } from './map-operations';
import { NOTIFICATION_FILTERS, TELEGRAM_GROUP_ID } from '../utils/consts';
import { validateObjectAgainstFilters } from '../utils/validate-object';
import { PostProcessingStatus } from '../lib/db/schemas/posts';

const logger = getLogger('notifications-operations');

export async function onNotification(postId: string) {

    const post = await getPostById(postId);

    if(!post) {
        logger.warn(`Post with ID ${postId} not found for notification`);
        return;
    }

    const validationResult = validateObjectAgainstFilters(post, [['processingStatus', PostProcessingStatus.Pending], ...NOTIFICATION_FILTERS]);

    if (!validationResult.isValid) {
        logger.info(`Post with ID ${postId} did not pass the filters`, validationResult.missmatchedFilters);
        logger.debug(`Post details: `, post);
        return;
    }

    const message = await formatPostMessage(post);

     const attachments = compact([
                ...(post.postAttachments || []),
                ...(post.childPosts?.flatMap((child) => child.childPost.postAttachments) || []),
    ]);
    logger.info(`Sending post ${post.postId} to Telegram with ${attachments.length} attachments`);
    const mediaGroup: { type: 'video' | 'photo'; localPath: string }[] = [];
            
    for (const attachment of attachments) {
        const localPath = attachment.localPath;

        // Add caption to the first image only
        mediaGroup.push({
            type: attachment.type === 'video' ? 'video' : 'photo',
            localPath,
        });
    }

    const staticMapAttachment = await generatePostStaticMapAttachment(post);
    if (staticMapAttachment) {
        mediaGroup.push(staticMapAttachment);
    }

    // Process up to 10 images (Telegram's maximum for a media group) 
    const limitedMediaGroup = mediaGroup.slice(0, 10);

    await sendMessageWithAttachments(TELEGRAM_GROUP_ID, message, limitedMediaGroup);
}

