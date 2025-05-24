import { bot } from './bot';
import { CombinedPost } from '../db/schemas/posts';
import path from 'path';
import fs from 'fs';
import os from 'os';
import fetch from 'node-fetch';
import { InputFile } from 'grammy';
import type { InputMediaPhoto } from '@grammyjs/types';

/**
 * Format a CombinedPost into a nice Telegram message
 */
export function formatPostMessage(post: CombinedPost): string {
  // Format the title with emojis
  const title = post.title 
    ? `🏠 *${post.title}*\n\n` 
    : (post.isHouse ? '🏠 *House for rent*\n\n' : (post.isApartment ? '🏢 *Apartment for rent*\n\n' : '🏡 *Property for rent*\n\n'));
  
  // Original post link - moved to the top for better visibility
  const postUrl = post.postUrl 
    ? `🔗 *Original Post:* [View on Facebook](${post.postUrl})\n\n` 
    : '';
  
  // Post text - show the full post text prominently at the top
  const postText = post.postText 
    ? `📝 *Post text:*\n${post.postText}\n\n` 
    : '';
  
  // Post date if available
  const postDateInfo = post.postDate 
    ? `📆 *Posted on:* ${post.postDate}\n\n` 
    : '';
  
  // Location information
  let location = '';
  if (post.location || post.city || post.neighborhood || post.village) {
    location = '📍 *Location:* ';
    if (post.city) location += post.city;
    if (post.neighborhood) location += (post.city ? ', ' : '') + post.neighborhood;
    if (post.village) location += ((post.city || post.neighborhood) ? ', ' : '') + post.village;
    if (post.location && !location.includes(post.location)) location += ' - ' + post.location;
    location += '\n';
  }
  
  // Price information with emoji
  const price = post.price 
    ? `💰 *Price:* ${post.price} ${post.isPriceFlexible ? '(Negotiable)' : ''}\n` 
    : '';

  // Long term rental information
  const rentalType = post.isForLongTerm !== undefined 
    ? `📋 *Rental type:* ${post.isForLongTerm ? 'Long term' : 'Short term'}\n` 
    : '';

  const propertyType = post.isHouse
    ? '🏠 *Property type:* House\n '
    : post.isApartment
    ? '🏢 *Property type:* Apartment\n '
    : '🏡 *Property type:* Other\n ';
  
  // Property details section
  let details = '';
  if (post.numberOfRooms || post.sizeInM2 || post.numberOfBedrooms || post.numberOfBathrooms) {
    details += '🛋 *Property details:*\n';
    if (post.numberOfRooms) details += `- ${post.numberOfRooms} room${post.numberOfRooms !== 1 ? 's' : ''}\n`;
    if (post.sizeInM2) details += `- ${post.sizeInM2}m² total size\n`;
    if (post.builtHouseSizeInM2) details += `- ${post.builtHouseSizeInM2}m² built area\n`;
    if (post.gardenSizeInM2) details += `- ${post.gardenSizeInM2}m² garden\n`;
    if (post.numberOfBedrooms) details += `- ${post.numberOfBedrooms} bedroom${post.numberOfBedrooms !== 1 ? 's' : ''}\n`;
    if (post.numberOfBathrooms) details += `- ${post.numberOfBathrooms} bathroom${post.numberOfBathrooms !== 1 ? 's' : ''}\n`;
    if (post.numberOfFloors) details += `- ${post.numberOfFloors} floor${post.numberOfFloors !== 1 ? 's' : ''}\n`;
    details += '\n';
  }
  
  // Amenities section with emojis
  let amenities = '';
  const amenitiesList = [
    post.hasParking && '🚗 Parking',
    post.hasGarden && '🌳 Garden',
    post.hasPool && '🏊 Swimming pool',
    post.hasBalcony && '🪟 Balcony',
    post.hasView && '🏞 View',
    post.isFullFurnished && '🛏 Fully furnished',
    post.isPartiallyFurnished && '🪑 Partially furnished',
    post.isNewConstruction && '🏗 New construction',
    post.isRenovated && '🔨 Renovated',
    post.isGardenMaintained && '✂️ Maintained garden'
  ].filter(Boolean);
  
  if (amenitiesList.length > 0) {
    amenities = '✨ *Amenities:* ' + amenitiesList.join(', ') + '\n\n';
  }
  
  // Utilities information
  let utilities = '';
  if (post.doesPriceIncludeAllUtilities || post.doesPriceIncludeInternet || post.doesPriceIncludeElectricity || post.doesPriceIncludeWater || post.doesPriceIncludeLocalTaxes) {
    utilities += '💡 *Utilities included:*\n';
    if (post.doesPriceIncludeAllUtilities) {
      utilities += '- All utilities included\n';
    } else {
      if (post.doesPriceIncludeInternet) utilities += '- Internet\n';
      if (post.doesPriceIncludeElectricity) utilities += '- Electricity\n';
      if (post.doesPriceIncludeWater) utilities += '- Water\n';
      if (post.doesPriceIncludeLocalTaxes) utilities += '- Local taxes\n';
    }
    utilities += '\n';
  }
  
  // Availability information
  let availability = '';
  if (post.availibleFrom || post.isAvailableNow) {
    availability = '📅 *Available:* ' + (post.isAvailableNow ? 'Now' : post.availibleFrom) + '\n';
    if (post.showingDate) {
      availability += `📅 *Showing:* ${post.showingDate}${post.showingTime ? ' at ' + post.showingTime : ''}\n`;
    }
    availability += '\n';
  }
  
  // Contact information
  let contact = '';
  if (post.phoneNumbers?.length || post.email || post.postAuthor || post.firstName || post.lastName) {
    contact += '📞 *Contact:*\n';
    
    // Author name - use full name if available
    if (post.firstName || post.lastName) {
      contact += `- ${[post.firstName, post.lastName].filter(Boolean).join(' ')}${post.isByBrokerOrAgent ? ' (Agent/Broker)' : ''}\n`;
    } else if (post.postAuthor) {
      contact += `- ${post.postAuthor}${post.isByBrokerOrAgent ? ' (Agent/Broker)' : ''}\n`;
    }
    
    // Phone numbers
    if (post.phoneNumbers?.length) {
      post.phoneNumbers.forEach(phone => {
        contact += `- ${phone.number}\n`;
      });
    }
    
    // Email
    if (post.email) contact += `- ${post.email}\n`;
    
    contact += '\n';
  }
  
  // Post links section - now showing additional links only since main postUrl is at the top
  let links = '';
  if (post.postLinks?.length) {
    links += '🔗 *Additional links:*\n';
    post.postLinks.forEach((link, index) => {
      if (index < 3) { // Limit to 3 additional links to avoid extremely long messages
        links += `- [Link ${index + 1}](${link})\n`;
      }
    });
    links += '\n';
  }
  
  // Combine all sections - added postUrl near the top
  const message = `${title}${postUrl}${postText}${postDateInfo}${location}${propertyType}${price}${rentalType}\n${details}${amenities}${utilities}${availability}${contact}${links}`;
  return message;
}

/**
 * Send a post to the Telegram group
 */
export async function sendPostToTelegram(post: CombinedPost): Promise<boolean> {
  try {
    const message = formatPostMessage(post);
    const chatId = process.env.TELEGRAM_GROUP_ID as string;
    
    // If there are images, send them as a media group
    if (post.postImages?.length) {
      const mediaFiles: string[] = [];
      const mediaGroup: InputMediaPhoto<InputFile>[] = [];
      
      // Process up to 10 images (Telegram's maximum for a media group)
      for (let i = 0; i < Math.min(post.postImages.length, 10); i++) {
        const imagePath = post.postImages[i];
        if (imagePath) {
          mediaFiles.push(imagePath);
          
          // Add caption to the first image only
          mediaGroup.push({
            type: 'photo',
            media: new InputFile(imagePath),
            // Only add caption to the first image
            ...(i === 0 ? { caption: message, parse_mode: 'Markdown' } : {})
          });
        }
      }
      
      if (mediaGroup.length > 0) {
        // Send media group
        await bot.api.sendMediaGroup(chatId, mediaGroup);
        
        // Clean up temporary files
        mediaFiles.forEach(file => {
          fs.unlinkSync(file);
        });
      } else {
        // If no images were successfully downloaded, send as text message
        await bot.api.sendMessage(chatId, message, {
          parse_mode: 'Markdown'
        });
      }
    } else {
      // Send as a text message if there are no images
      await bot.api.sendMessage(chatId, message, {
        parse_mode: 'Markdown'
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error sending post to Telegram:', error);
    return false;
  }
}