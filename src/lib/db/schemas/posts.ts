import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { FormattedFacebookPost } from '../../facebook/extractors/post';
import { ExtractedPostDetails } from '../../gemini/extract-post-details';

/**
 * Combined type for posts including raw Facebook data and extracted details
 */
export type CombinedPost = FormattedFacebookPost & Partial<ExtractedPostDetails>;

/**
 * Posts table schema
 */
export const postsTable = sqliteTable('posts', {
  // Primary key and identifiers
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: text('post_id').notNull().unique(),
  
  // Basic post information
  postText: text('post_text').notNull(),
  postAuthor: text('post_author'),
  postAuthorId: text('post_author_id'),
  postAuthorUrl: text('post_author_url'),
  postUrl: text('post_url'),
  postDate: text('post_date'),
  
  // Post attachments
  postImages: text('post_images'), // JSON stringify array
  postVideos: text('post_videos'), // JSON stringify array
  postLinks: text('post_links'), // JSON stringify array
  
  // Author contact information
  email: text('email'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  
  // Post metadata
  commentCount: integer('comment_count').default(0),
  hasSharedContent: integer('has_shared_content', { mode: 'boolean' }).default(false),
  sharedPost: text('shared_post'), // JSON stringify shared post

  // Extracted post details
  title: text('title'),
  isHouseRentalListing: integer('is_house_rental_listing', { mode: 'boolean' }),
  location: text('location'),
  city: text('city'),
  neighborhood: text('neighborhood'),
  village: text('village'),
  price: real('price'),
  isPriceFlexible: integer('is_price_flexible', { mode: 'boolean' }),
  hasPrice: integer('has_price', { mode: 'boolean' }),
  isHouse: integer('is_house', { mode: 'boolean' }),
  isApartment: integer('is_apartment', { mode: 'boolean' }),
  sizeInM2: real('size_in_m2'),
  gardenSizeInM2: real('garden_size_in_m2'),
  builtHouseSizeInM2: real('built_house_size_in_m2'),
  numberOfFloors: integer('number_of_floors'),
  numberOfRooms: real('number_of_rooms'),
  numberOfBedrooms: integer('number_of_bedrooms'),
  numberOfBathrooms: integer('number_of_bathrooms'),
  isForLongTerm: integer('is_for_long_term', { mode: 'boolean' }),
  hasParking: integer('has_parking', { mode: 'boolean' }),
  hasGarden: integer('has_garden', { mode: 'boolean' }),
  isGardenMaintained: integer('is_garden_maintained', { mode: 'boolean' }),
  hasPool: integer('has_pool', { mode: 'boolean' }),
  hasBalcony: integer('has_balcony', { mode: 'boolean' }),
  hasView: integer('has_view', { mode: 'boolean' }),
  isFullFurnished: integer('is_full_furnished', { mode: 'boolean' }),
  isPartiallyFurnished: integer('is_partially_furnished', { mode: 'boolean' }),
  doesPriceIncludeAllUtilities: integer('does_price_include_all_utilities', { mode: 'boolean' }),
  doesPriceIncludeInternet: integer('does_price_include_internet', { mode: 'boolean' }),
  doesPriceIncludeElectricity: integer('does_price_include_electricity', { mode: 'boolean' }),
  doesPriceIncludeWater: integer('does_price_include_water', { mode: 'boolean' }),
  doesPriceIncludeLocalTaxes: integer('does_price_include_local_taxes', { mode: 'boolean' }),
  availibleFrom: text('availible_from'),
  isAvailableNow: integer('is_available_now', { mode: 'boolean' }),
  showingDate: text('showing_date'),
  showingTime: text('showing_time'),
  isNewConstruction: integer('is_new_construction', { mode: 'boolean' }),
  isRenovated: integer('is_renovated', { mode: 'boolean' }),
  phoneNumbers: text('phone_numbers'), // JSON stringify array
  isByBrokerOrAgent: integer('is_by_broker_or_agent', { mode: 'boolean' }),
  
  // Timestamps for record keeping
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  processedAt: text('processed_at'),
});

/**
 * Helper functions to convert between database and application types
 */

/**
 * Convert a CombinedPost to a database record
 */
export function postToDbRecord(post: CombinedPost) {
  return {
    postId: post.postId,
    postText: post.postText,
    postAuthor: post.postAuthor,
    postAuthorId: post.postAuthorId,
    postAuthorUrl: post.postAuthorUrl,
    postUrl: post.postUrl,
    postDate: post.postDate,
    postImages: post.postImages?.length ? JSON.stringify(post.postImages) : null,
    postVideos: post.postVideos?.length ? JSON.stringify(post.postVideos) : null,
    postLinks: post.postLinks?.length ? JSON.stringify(post.postLinks) : null,
    email: post.email,
    firstName: post.firstName,
    lastName: post.lastName,
    commentCount: post.commentCount,
    hasSharedContent: post.hasSharedContent,
    sharedPost: post.sharedPost ? JSON.stringify(post.sharedPost) : null,
    
    // Extracted details
    title: post.title,
    isHouseRentalListing: post.isHouseRentalListing,
    location: post.location,
    city: post.city,
    neighborhood: post.neighborhood,
    village: post.village,
    price: post.price,
    isPriceFlexible: post.isPriceFlexible,
    hasPrice: post.hasPrice,
    isHouse: post.isHouse,
    isApartment: post.isApartment,
    sizeInM2: post.sizeInM2,
    gardenSizeInM2: post.gardenSizeInM2,
    builtHouseSizeInM2: post.builtHouseSizeInM2,
    numberOfFloors: post.numberOfFloors,
    numberOfRooms: post.numberOfRooms,
    numberOfBedrooms: post.numberOfBedrooms,
    numberOfBathrooms: post.numberOfBathrooms,
    isForLongTerm: post.isForLongTerm,
    hasParking: post.hasParking,
    hasGarden: post.hasGarden,
    isGardenMaintained: post.isGardenMaintained,
    hasPool: post.hasPool,
    hasBalcony: post.hasBalcony,
    hasView: post.hasView,
    isFullFurnished: post.isFullFurnished,
    isPartiallyFurnished: post.isPartiallyFurnished,
    doesPriceIncludeAllUtilities: post.doesPriceIncludeAllUtilities,
    doesPriceIncludeInternet: post.doesPriceIncludeInternet,
    doesPriceIncludeElectricity: post.doesPriceIncludeElectricity,
    doesPriceIncludeWater: post.doesPriceIncludeWater,
    doesPriceIncludeLocalTaxes: post.doesPriceIncludeLocalTaxes,
    availibleFrom: post.availibleFrom,
    isAvailableNow: post.isAvailableNow,
    showingDate: post.showingDate,
    showingTime: post.showingTime,
    isNewConstruction: post.isNewConstruction,
    isRenovated: post.isRenovated,
    phoneNumbers: post.phoneNumbers?.length ? JSON.stringify(post.phoneNumbers) : null,
    isByBrokerOrAgent: post.isByBrokerOrAgent
  };
}

/**
 * Convert a database record to a CombinedPost
 */
export function dbRecordToPost(record: any): CombinedPost {
  return {
    ...record,
    postImages: record.postImages ? JSON.parse(record.postImages) : [],
    postVideos: record.postVideos ? JSON.parse(record.postVideos) : [],
    postLinks: record.postLinks ? JSON.parse(record.postLinks) : [],
    sharedPost: record.sharedPost ? JSON.parse(record.sharedPost) : null,
    phoneNumbers: record.phoneNumbers ? JSON.parse(record.phoneNumbers) : [],
    postDate: record.postDate ? new Date(record.postDate) : undefined,
    createdAt: record.createdAt ? new Date(record.createdAt) : undefined,
    updatedAt: record.updatedAt ? new Date(record.updatedAt) : undefined,
    processedAt: record.processedAt ? new Date(record.processedAt) : undefined
  }
}