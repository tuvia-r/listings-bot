import { sendMessageWithAttachments } from './bot';
import { PostWithRelations } from '../db/schemas/posts';
import { searchCoords } from '../maps/coords';
import { createStaticMap } from '../maps/static';
import { readFile } from 'fs/promises';
import { compact } from 'lodash-es';
import { getLogger } from '../../utils/logger';
import { existsSync, mkdirSync } from 'fs';
import { MAPS_DIR, TELEGRAM_GROUP_ID } from '../../utils/consts';

const logger = getLogger('send-post');

if (!existsSync(MAPS_DIR)) {
    mkdirSync(MAPS_DIR, { recursive: true });
}

function getPostDateInfo(post: PostWithRelations): string {
    const childPostDate = post.childPosts?.[0]?.childPost.creationTime;
    const creationTime = post.creationTime || childPostDate;
    const hasTwoDates = post.creationTime && childPostDate && post.creationTime !== childPostDate;
    const hasDate = Boolean(creationTime || childPostDate);
    if (!hasDate) return '';
    const dateText = hasTwoDates
        ? `${new Date(post.creationTime!).toLocaleDateString('he-IL')} / ${new Date(childPostDate!).toLocaleDateString('he-IL')}`
        : `${new Date(creationTime!).toLocaleDateString('he-IL')}`;
    return creationTime ? dateText : '';
}

/**
 * Format a CombinedPost into a nice Telegram message
 */
export async function formatPostMessage(post: PostWithRelations, locationUrl: string): Promise<string> {
    const postMdTemplate = await readFile('./assets/post-template.md', 'utf-8');

    const originalText = [post.text, ...(post.childPosts?.map((child) => child.childPost.text) || [])].join('\n --- \n');

    const postMkdn = postMdTemplate
        .replace('$title$', post.postSummary ?? '-')
        .replace('$originalUrl$', post.postUrl ?? '-')
        .replace('$content$', post.postDescription ?? '-')
        .replace('$original$', originalText || '-')
        .replace('$price$', post.postPrice ?? 'לא צויין מחיר')
        .replace('$location$', post.postLocation ?? '-')
        .replace('$locationUrl$', locationUrl)
        .replace('$size$', post.listingSize ?? 'לא צויין גודל')
        .replace('$availableFrom$', post.availableFrom ? new Date(post.availableFrom).toLocaleDateString('he-IL') : 'לא צויין')
        .replace('$extraDetails$', post.postExtraDetails ?? '')
        .replace('$contactInfo$', post.postContactInfo ?? 'לא צויין פרטי קשר')
        .replace('$date$', getPostDateInfo(post));

    return postMkdn;
}

/**
 * Send a post to the Telegram group
 */
export async function sendPostToTelegram(post: PostWithRelations): Promise<boolean> {
    try {
        const locationUrl = `https://www.google.com/maps/search/?api=1&query=${post.postLocation}`;
        const message = await formatPostMessage(post, locationUrl);
        const chatId = TELEGRAM_GROUP_ID;

        // If there are images, send them as a media group
        const attachments = compact([...(post.postAttachments || []), ...(post.childPosts?.flatMap((child) => child.childPost.postAttachments) || [])]);
        logger.info(`Sending post ${post.postId} to Telegram with ${attachments.length} attachments`);
        const mediaGroup: { type: 'video' | 'photo'; localPath: string }[] = [];
        if (attachments.length) {
            // Process up to 10 images (Telegram's maximum for a media group)
            for (const attachment of attachments) {
                const localPath = attachment.localPath;

                // Add caption to the first image only
                mediaGroup.push({
                    type: attachment.type === 'video' ? 'video' : 'photo',
                    localPath,
                });
            }

            const location = post.location || post.childPosts?.[0]?.childPost.location;
            if (location) {
                const locationCoords = await searchCoords(location);
                if (locationCoords) {
                    const mapPath = `${MAPS_DIR}/${post.postId}-map.png`;
                    await createStaticMap(locationCoords, mapPath);
                    mediaGroup.push({
                        type: 'photo',
                        localPath: mapPath,
                    });
                }
            }

            logger.log(`Preparing to send ${mediaGroup.length} media items to Telegram with attachments`, {
                mediaGroup,
            });
        }

        await sendMessageWithAttachments(chatId, message, mediaGroup);

        return true;
    } catch (error) {
        logger.error('Error sending post to Telegram:', error);
        return false;
    }
}
