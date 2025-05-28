import { TELEGRAM_GROUP_ID } from '../../utils/consts';
import { sendTextMessage } from './bot';

const chatId = TELEGRAM_GROUP_ID;

export async function logStart() {
    await sendTextMessage(chatId, `Scroller started`, {
        disableNotification: true,
    });
}

export async function logError(error: Error) {
    await sendTextMessage(chatId, `Error occurred: ${error.message}\nStack: ${error.stack}`, {
        disableNotification: true,
    });
}

export async function logDone(message?: string) {
    await sendTextMessage(chatId, `Done: ${message}`, {
        disableNotification: true,
    });
}
