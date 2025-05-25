import { bot } from "./bot";
import { CombinedPostFromDb } from "../db/schemas/posts";
import fs from "fs";
import { InputFile } from "grammy";
import type { InputMediaPhoto, InputMediaVideo } from "@grammyjs/types";

function getPostText(post: CombinedPostFromDb): string {
	const text = [
		post.text,
		post.childPosts?.map((child) => child.text).join("\n"),
	]
		.filter(Boolean)
		.join("\n");
	return text.length > 0 ? `${text}\n\n\n` : "";
}

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
		? `📆 *Posted on:* ${new Date(
				post.creationTime!
		  ).toLocaleDateString()} (original) / ${new Date(
				childPostDate
		  ).toLocaleDateString()} (child)\n`
		: `📆 *Posted on:* ${new Date(creationTime!).toLocaleDateString()}\n`;
	return creationTime ? dateText : "";
}

function getLocationInfo(post: CombinedPostFromDb): string {
	const childPostLocation = post.childPosts?.[0]?.location;
	const location = post.location || childPostLocation;
	return location ? `📍 *Location:* ${location}\n` : "";
}

function getPriceInfo(post: CombinedPostFromDb): string {
	const childPostPrice = post.childPosts?.[0]?.price;
	const price = post.price || childPostPrice;
	return price
		? `💰 *Price:* ${price} ${post.isPriceFlexible ? "(Negotiable)" : ""}\n`
		: "";
}

function getRentalTypeInfo(post: CombinedPostFromDb): string {
	const childPostRentalType = post.childPosts?.[0]?.isForLongTerm;
	const rentalType =
		post.isForLongTerm !== undefined
			? post.isForLongTerm
			: childPostRentalType;
	return rentalType !== undefined
		? `📋 *Rental type:* ${rentalType ? "Long term" : "Short term"}\n`
		: "";
}

function getPropertyTypeInfo(post: CombinedPostFromDb): string {
	const childPostIsHouse = post.childPosts?.[0]?.isHouse;
	const isHouse =
		post.isHouse !== undefined ? post.isHouse : childPostIsHouse;
	return isHouse !== undefined
		? `🏠 *Property type:* ${isHouse ? "House" : "Apartment"}\n`
		: "";
}

function getDetails(post: CombinedPostFromDb): string {
	const childPostDetails = post.childPosts?.[0];
	const detailsList = [
		post.numberOfRooms || childPostDetails?.numberOfRooms
			? `🛋 *Number of rooms:* ${
					post.numberOfRooms || childPostDetails?.numberOfRooms
			  }\n`
			: "",
		post.sizeInM2 || childPostDetails?.sizeInM2
			? `📏 *Size:* ${post.sizeInM2 || childPostDetails?.sizeInM2} m²\n`
			: "",
		post.numberOfBedrooms || childPostDetails?.numberOfBedrooms
			? `🛏 *Number of bedrooms:* ${
					post.numberOfBedrooms || childPostDetails?.numberOfBedrooms
			  }\n`
			: "",
		post.numberOfFloors || childPostDetails?.numberOfFloors
			? `🏢 *Number of floors:* ${
					post.numberOfFloors || childPostDetails?.numberOfFloors
			  }\n`
			: "",
	].filter(Boolean);
	return detailsList.length > 0 ? `${detailsList.join("")}\n` : "";
}

function getAmenities(post: CombinedPostFromDb): string {
	const childPostAmenities = post.childPosts?.[0];
	const amenitiesList = [
		(post.hasParking || childPostAmenities?.hasParking) && "🚗 Parking",
		(post.hasGarden || childPostAmenities?.hasGarden) && "🌳 Garden",
		(post.isFullFurnished || childPostAmenities?.isFullFurnished) &&
			"🛏 Fully furnished",
		(post.isPartiallyFurnished ||
			childPostAmenities?.isPartiallyFurnished) &&
			"🪑 Partially furnished",
		(post.isNewConstruction || childPostAmenities?.isNewConstruction) &&
			"🏗 New construction",
		(post.isRenovated || childPostAmenities?.isRenovated) && "🔨 Renovated",
	].filter(Boolean);
	return amenitiesList.length > 0
		? `✨ *Amenities:* ${amenitiesList.join(", ")}\n`
		: "";
}

function getUtilitiesInfo(post: CombinedPostFromDb): string {
	const childPostUtilities = post.childPosts?.[0];
	let utilities = "";
	const doesPriceIncludeElectricity =
		post.doesPriceIncludeElectricity ||
		childPostUtilities?.doesPriceIncludeElectricity;
	const doesPriceIncludeWater =
		post.doesPriceIncludeWater || childPostUtilities?.doesPriceIncludeWater;
	const doesPriceIncludeLocalTaxes =
		post.doesPriceIncludeLocalTaxes ||
		childPostUtilities?.doesPriceIncludeLocalTaxes;
	if (
		doesPriceIncludeElectricity ||
		doesPriceIncludeWater ||
		doesPriceIncludeLocalTaxes
	) {
		utilities += "💡 *Utilities included:*\n";
		if (doesPriceIncludeElectricity) utilities += "- Electricity\n";
		if (doesPriceIncludeWater) utilities += "- Water\n";
		if (doesPriceIncludeLocalTaxes) utilities += "- Local taxes\n";
		utilities += "\n";
	}
	return utilities;
}

function getAvailibilityInfo(post: CombinedPostFromDb): string {
	const childPostAvailableFrom = post.childPosts?.[0]?.availableFrom;
	const availableFrom = post.availableFrom || childPostAvailableFrom;
	const showingDate = post.showingDate || post.childPosts?.[0]?.showingDate;
	const showingTime = post.showingTime || post.childPosts?.[0]?.showingTime;
	let availability = "";
	if (availableFrom || showingDate) {
		availability += "📅 *Available:* " + (availableFrom || "") + "\n";
		if (showingDate) {
			availability += `📅 *Showing:* ${showingDate}${
				showingTime ? " at " + showingTime : ""
			}\n`;
		}
		availability += "\n";
	}
	return availability;
}

function getContactInfo(post: CombinedPostFromDb): string {
	const childPostContact = post.childPosts?.[0];
	const phoneNumbers =
		post.phoneNumbers || childPostContact?.phoneNumbers || [];
	const publisherName = post.publisherName || childPostContact?.publisherName;
	const isByBrokerOrAgent =
		post.isByBrokerOrAgent || childPostContact?.isByBrokerOrAgent;
	let contact = "";
	if (phoneNumbers.length) {
		contact += "📞 *Contact:*\n";
	}
	if (publisherName) {
		contact += `- ${publisherName}${
			isByBrokerOrAgent ? " (Agent/Broker)" : ""
		}\n`;
	}
	// Phone numbers
	if (phoneNumbers.length) {
		phoneNumbers.forEach((phone) => {
			contact += `- ${phone.number}${
				phone.forWhatsApp ? " (WhatsApp)" : ""
			}${phone.forPhoneCall ? " (Call)" : ""}\n`;
		});
	}
	contact += "\n";
	return contact;
}

/**
 * Format a CombinedPost into a nice Telegram message
 */
export function formatPostMessage(post: CombinedPostFromDb): string {
	// Original post link - moved to the top for better visibility
	const postUrl = post.postUrl
		? `🔗 *Original Post:* [View on Facebook](${post.postUrl})\n`
		: "";

	// Post text - show the full post text prominently at the top
	const postText = getPostText(post);

	// Post date if available
	const postDateInfo = getPostDateInfo(post);

	// Location information
	const location = getLocationInfo(post);

	// Price information with emoji
	const price = getPriceInfo(post);

	// Long term rental information
	const rentalType = getRentalTypeInfo(post);

	const propertyType = getPropertyTypeInfo(post);

	// Property details section
	const details = getDetails(post);

	// Amenities section with emojis
	const amenities = getAmenities(post);

	// Utilities information
	const utilities = getUtilitiesInfo(post);

	// Availability information
	const availability = getAvailibilityInfo(post);

	// Contact information
	// const contact = getContactInfo(post);

	// Combine all sections - added postUrl near the top
	const message = `${postUrl}${postText}${postDateInfo}${location}${propertyType}${price}${rentalType}\n${details}${amenities}${utilities}${availability}`;
	return message;
}

/**
 * Send a post to the Telegram group
 */
export async function sendPostToTelegram(
	post: CombinedPostFromDb
): Promise<boolean> {
	try {
		const message = formatPostMessage(post);
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
		if (attachments.length) {
			const mediaFiles: string[] = [];
			const mediaGroup: (
				| InputMediaPhoto<InputFile>
				| InputMediaVideo<InputFile>
			)[] = [];

			// Process up to 10 images (Telegram's maximum for a media group)
			for (const attachment of attachments) {
				const localPath = attachment.localPath;

				mediaFiles.push(localPath);

				// Add caption to the first image only
				mediaGroup.push({
					type:
						attachment.type === "video"
							? "video"
							: "photo",
					media: new InputFile(localPath)
				});
			}

      console.log(
        `Preparing to send ${mediaGroup.length} media items to Telegram with attachments`, {
          mediaGroup
        });

			if (mediaGroup.length > 0) {
				// Send media group
				await bot.api.sendMediaGroup(chatId, mediaGroup);

			} 
			
		} 
			// Send as a text message if there are no images
			await bot.api.sendMessage(chatId, message, {
				parse_mode: "Markdown",
			});
		

		return true;
	} catch (error) {
		console.error("Error sending post to Telegram:", error);
		return false;
	}
}
