import { sendMessageWithAttachments } from "./bot";
import { CombinedPostFromDb } from "../db/schemas/posts";
import { InputFile } from "grammy";
import type { InputMediaPhoto, InputMediaVideo } from "@grammyjs/types";
import { searchCoords } from "../maps/coords";
import { createStaticMap } from "../maps/static";
import { readFile } from "fs/promises";
import telegramifyMarkdown from 'telegramify-markdown';

function getPostDateInfo(post: CombinedPostFromDb): string {
	const childPostDate = post.childPosts?.[0]?.creationTime;
	const creationTime = post.creationTime || childPostDate;
	const hasTwoDates =
		post.creationTime &&
		childPostDate &&
		post.creationTime !== childPostDate;
	const hasDate = Boolean(creationTime || childPostDate);
	if (!hasDate) return "";
	const dateText = hasTwoDates
		? `${new Date(
				post.creationTime!
		  ).toLocaleDateString('he-IL')} / ${new Date(
				childPostDate!
		  ).toLocaleDateString('he-IL')}`
		: `${new Date(creationTime!).toLocaleDateString('he-IL')}`;
	return creationTime ? dateText : "";
}

/**
 * Format a CombinedPost into a nice Telegram message
 */
export async function formatPostMessage(post: CombinedPostFromDb, locationUrl: string): Promise<string> {
	const postMdTemplate = await readFile('./assets/post-template.md', 'utf-8');

	const originalText = [post.text, ...(post.childPosts?.map(child => child.text) || [])].join('\n --- \n')

	const postMkdn = postMdTemplate
		.replace("$title$", post.postSummaryInHebrow ?? '-')
		.replace("$originalUrl$", post.postUrl ?? '-')
		.replace("$content$", post.postDescriptionInHebrew ?? '-')
		.replace("$original$", originalText || '-')
		.replace("$price$", post.postPriceInHebrew ?? 'לא צויין מחיר')
		.replace("$location$", post.postLocationInHebrew ?? '-')
		.replace("$locationUrl$", locationUrl)
		.replace("$size$", post.listingSizeInHebrow ?? 'לא צויין גודל')
		.replace("$availableFrom$", post.availableFrom ? new Date(post.availableFrom).toLocaleDateString('he-IL') : 'לא צויין')
		.replace("$extraDetails$", post.postExtraDetailsInHebrew ?? '')
		.replace("$contactInfo$", post.postContactInfoInHebrew ?? 'לא צויין פרטי קשר')
		.replace("$date$", getPostDateInfo(post));

	return postMkdn;
// 	return `
// ${getPostDateInfo(post)}
// [${post.postSummaryInHebrow}](${post.postUrl})
// ${post.postDescriptionInHebrew}
// 🏷️ ${post.price || "-"}
// ✅ ${post.availableFrom ? new Date(post.availableFrom).toLocaleDateString('he-IL') : "-"}
// 📏 ${post.listingSizeInHebrow || "-"}
// 📃 ${post.postExtraDetailsInHebrew || "-"}
// ☎️ ${post.postContactInfoInHebrew || "-"}
// 📍 [${post.postLocationInHebrew || "-"}](${locationUrl})
// `;

}

/**
 * Send a post to the Telegram group
 */
export async function sendPostToTelegram(
	post: CombinedPostFromDb
): Promise<boolean> {
	try {
		const locationUrl = `https://www.google.com/maps/search/?api=1&query=${post.postLocationInHebrew}`;
		const message = await formatPostMessage(post, locationUrl);
		const chatId = process.env.TELEGRAM_GROUP_ID as string;

		// If there are images, send them as a media group
		const attachments = [
			...(post.allAttechments || []),
			...(post.childPosts?.flatMap((child) => child.allAttechments) ||
				[]),
		];
		console.log(
			`Sending post ${post.postId} to Telegram with ${attachments.length} attachments`
		);
		const mediaGroup: {type: 'video' | 'photo'; localPath: string}[] = [];
		if (attachments.length) {
			// Process up to 10 images (Telegram's maximum for a media group)
			for (const attachment of attachments) {
				const localPath = attachment.localPath;

				// Add caption to the first image only
				mediaGroup.push({
					type: attachment.type === "video" ? "video" : "photo",
					localPath,
				});
			}

			const location = post.location || post.childPosts?.[0]?.location;
			if (location) {
				const locationCoords = await searchCoords(location);
				if (locationCoords) {
					const mapPath = `./.maps/${post.postId}-map.png`;
					await createStaticMap(locationCoords, mapPath);
					mediaGroup.push({
						type: "photo",
						localPath: mapPath,
					});
				}
			}

			console.log(
				`Preparing to send ${mediaGroup.length} media items to Telegram with attachments`,
				{
					mediaGroup,
				}
			);
		}

		await sendMessageWithAttachments(
			chatId,
			message,
			mediaGroup
		);

		return true;
	} catch (error) {
		console.error("Error sending post to Telegram:", error);
		return false;
	}
}
