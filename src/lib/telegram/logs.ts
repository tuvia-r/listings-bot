import { bot } from "./bot";

const chatId = process.env.TELEGRAM_GROUP_ID as string;


export async function logStart() {
    await bot.api.sendMessage(
        chatId,
        `Scroller started`,
        {
            parse_mode: "Markdown",
            disable_notification: true, 
        }
    );
}

export async function logError(error: Error) {
    await bot.api.sendMessage(
        chatId,
        `Error occurred: ${error.message}\nStack: ${error.stack}`,
        {
            parse_mode: "Markdown",
            disable_notification: true, 
        }
    );
}

export async function logDone(message?: string) {
    await bot.api.sendMessage(
        chatId,
        `Done: ${message}`,
        {
            parse_mode: "Markdown",
            disable_notification: true, 
        }
    );
}