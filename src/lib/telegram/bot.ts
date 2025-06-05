import { Bot, InputFile } from 'grammy';
import { InputMediaPhoto, InputMediaVideo } from 'grammy/types';
import pRetry from 'p-retry';
import { getLogger } from '../../utils/logger';

const logger = getLogger('telegram-bot');

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN as string);

export async function sendTextMessage(chatId: string, text: string, params?: { disableNotification?: boolean }) {
    await pRetry(
        async () =>
            bot.api.sendMessage(chatId, text, {
                parse_mode: 'Markdown',
                disable_notification: params?.disableNotification,
            }),
        {
            retries: 3,
            factor: 2,
            minTimeout: 1000 * 10,
            maxTimeout: 1000 * 60, // 1 minute
            onFailedAttempt: (error) => {
                logger.error(`Failed to send message: ${error.message}`);
            },
        },
    );
}

export async function sendMessageWithAttachments(
    chatId: string,
    text: string,
    files: { type: 'video' | 'photo'; localPath: string }[],
) {
    let hasMediaBeenSent = false;
    await pRetry(
        async () => {
            if (files.length > 0 && !hasMediaBeenSent) {
                const mediaGroup: (InputMediaPhoto | InputMediaVideo)[] = files.map((file) => ({
                    type: file.type,
                    media: new InputFile(file.localPath),
                }));

                if (mediaGroup.length) {
                    mediaGroup[0].caption = text; // Set caption for the first media item
                    mediaGroup[0].parse_mode = 'HTML'; // Set parse mode for the caption
                }
                // Send media group
                await bot.api.sendMediaGroup(chatId, mediaGroup);
                hasMediaBeenSent = true;
            } else {
                // Send as a text message if there are no images
                await bot.api.sendMessage(chatId, text, {
                    parse_mode: 'HTML',
                });
            }
        },
        {
            retries: 3,
            factor: 2,
            minTimeout: 1000 * 10,
            maxTimeout: 1000 * 60, // 1 minute
            onFailedAttempt: (error) => {
                if (/message caption is too long/.test(error.stack ?? error.message)) {
                    logger.warn(`Message too long, sending as text instead: ${error.message}`);
                    text = text.split('<blockquote expandable>\n<b>:הפוסט המקורי</b>')[0].slice(0, 4096); // Telegram's max message length
                    // shouldSendTextAsDescription = true; // Fallback to text if media group fails
                }
                logger.error(`Failed to send message with attachments: ${error.message}`, text);
            },
        },
    );
}
