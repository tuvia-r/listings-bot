import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';
import { ExtractedPostDetails } from '../../gemini/extract-post-details';
import { GroupFeedPost, GroupFeedPostAttachment } from '../../facebook/group-feed-extractor';
import { relations } from 'drizzle-orm';

/**
 * Combined type for posts including raw Facebook data and extracted details
 */
export type CombinedPost = GroupFeedPost & Partial<ExtractedPostDetails>;
export type CombinedPostFromDb = CombinedPost & {
  createdAt: number;
  updatedAt: number;
  childPosts?: CombinedPost[];
  parentPosts?: CombinedPost[];
};


export enum PostProcessingStatus {
  Pending = 'pending',
  Processed = 'processed',
  Failed = 'failed',
  Skipped = 'skipped'
}

/**
 * Posts table schema
 */
export const postsTable = sqliteTable('posts', {
  id: text('id').primaryKey(),
  postId: text('post_id').notNull().unique(),
  groupId: text('group_id'),
  groupName: text('group_name'),
  postText: text('post_text').notNull(),
  postUrl: text('post_url').$type<string>(),
  postAttachments: text('post_attachments').$type<GroupFeedPostAttachment[]>().$default(() => sql`[]`),
  sharedPost: text('shared_post').$type<CombinedPost | null>().$default(() => null),
  phoneNumbers: text('phone_numbers').$type<string[]>().$default(() => sql`[]`),
  createdAt: real('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: real('updated_at').notNull().default(sql`(strftime('%s', 'now'))`),
  processingStatus: text('processing_status').notNull().$type<PostProcessingStatus>().default(PostProcessingStatus.Pending),
  creationTime: real('creation_time').notNull().default(sql`(strftime('%s', 'now'))`),
  isHouseRentalListing: integer('is_house_rental_listing').notNull().default(0),
  location: text('location').notNull().default(''),
  price: real('price').$type<number | null>().default(null),
  isPriceFlexible: integer('is_price_flexible').notNull().default(0),
  isHouse: integer('is_house').notNull().default(0),
  sizeInM2: real('size_in_m2').$type<number | null>().default(null),
  numberOfFloors: integer('number_of_floors').$type<number | null>().default(null),
  numberOfRooms: integer('number_of_rooms').$type<number | null>().default(null),
  numberOfBedrooms: integer('number_of_bedrooms').$type<number | null>().default(null),
  isForLongTerm: integer('is_for_long_term').notNull().default(0),
  hasParking: integer('has_parking').notNull().default(0),
  hasGarden: integer('has_garden').notNull().default(0),
  isFullFurnished: integer('is_full_furnished').notNull().default(0),
  isPartiallyFurnished: integer('is_partially_furnished').notNull().default(0),
  doesPriceIncludeElectricity: integer('does_price_include_electricity').notNull().default(0),
  doesPriceIncludeWater: integer('does_price_include_water').notNull().default(0),
  doesPriceIncludeLocalTaxes: integer('does_price_include_local_taxes').notNull().default(0),
  availableFrom: text('available_from').$type<string | null>().default(null),
  showingDate: text('showing_date').$type<string | null>().default(null),
  showingTime: text('showing_time').$type<string | null>().default(null),
  isNewConstruction: integer('is_new_construction').notNull().default(0),
  isRenovated: integer('is_renovated').notNull().default(0),
  isByBrokerOrAgent: integer('is_by_broker_or_agent').notNull().default(0),
});

export const PostToPostTable = sqliteTable('post_to_post', {
  parentPostId: text('parent_post_id').notNull().references(() => postsTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  childPostId: text('child_post_id').notNull().references(() => postsTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.childPostId, table.parentPostId] })
]);

export const PostRelations = relations(postsTable, ({ many }) => ({
  childPosts: many(PostToPostTable, {
    relationName: 'parentPost',
  }),
  parentPosts: many(PostToPostTable, {
    relationName: 'childPost'
  }),
}));

export const PostToPostRelations = relations(PostToPostTable, ({ one }) => ({
  parentPost: one(postsTable, {
    fields: [PostToPostTable.parentPostId],
    references: [postsTable.id],
    relationName: 'parentPost'
  }),
  childPost: one(postsTable, {
    fields: [PostToPostTable.childPostId],
    references: [postsTable.id],
    relationName: 'childPost'
  }),
}));


function combinedPostToDb(post: CombinedPost): Record<string, any> {
  const dbRecord: Record<string, any> = {
    id: post.postId, // Ensure id is a number
    postId: post.postId,
    groupId: post.groupId,
    groupName: post.groupName || '',
    postText: post.text,
    postUrl: post.postUrl,
    postAttachments: JSON.stringify(post.allAttechments || '[]'),
    phoneNumbers: JSON.stringify(post.phoneNumbers || '[]'),
    creationTime: post.creationTime,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  // Map extracted details to database fields
  if (post.isHouseRentalListing !== undefined) dbRecord.isHouseRentalListing = post.isHouseRentalListing ? 1 : 0;
  if (post.location) dbRecord.location = post.location;
  if (post.price !== undefined) dbRecord.price = post.price;
  if (post.isPriceFlexible !== undefined) dbRecord.isPriceFlexible = post.isPriceFlexible ? 1 : 0;
  if (post.isHouse !== undefined) dbRecord.isHouse = post.isHouse ? 1 : 0;
  if (post.sizeInM2 !== undefined) dbRecord.sizeInM2 = post.sizeInM2;
  if (post.numberOfFloors !== undefined) dbRecord.numberOfFloors = post.numberOfFloors;
  if (post.numberOfRooms !== undefined) dbRecord.numberOfRooms = post.numberOfRooms;
  if (post.numberOfBedrooms !== undefined) dbRecord.numberOfBedrooms = post.numberOfBedrooms;
  if (post.isForLongTerm !== undefined) dbRecord.isForLongTerm = post.isForLongTerm ? 1 : 0;
  if (post.hasParking !== undefined) dbRecord.hasParking = post.hasParking ? 1 : 0;
  if (post.hasGarden !== undefined) dbRecord.hasGarden = post.hasGarden ? 1 : 0;
  if (post.isFullFurnished !== undefined) dbRecord.isFullFurnished = post.isFullFurnished ? 1 : 0;
  if (post.isPartiallyFurnished !== undefined) dbRecord.isPartiallyFurnished = post.isPartiallyFurnished ? 1 : 0;
  if (post.doesPriceIncludeElectricity !== undefined) dbRecord.doesPriceIncludeElectricity = post.doesPriceIncludeElectricity ? 1 : 0;
  if (post.doesPriceIncludeWater !== undefined)
    dbRecord.doesPriceIncludeWater = post.doesPriceIncludeWater ? 1 : 0;
  if (post.doesPriceIncludeLocalTaxes !== undefined)
    dbRecord.doesPriceIncludeLocalTaxes = post.doesPriceIncludeLocalTaxes ? 1 : 0;
  if (post.availableFrom) dbRecord.availableFrom = post.availableFrom;
  if (post.showingDate) dbRecord.showingDate = post.showingDate;
  if (post.showingTime) dbRecord.showingTime = post.showingTime;
  if (post.isNewConstruction !== undefined) dbRecord.isNewConstruction = post.isNewConstruction ? 1 : 0;
  if (post.isRenovated !== undefined) dbRecord.isRenovated = post.isRenovated ? 1 : 0;
  if (post.isByBrokerOrAgent !== undefined) dbRecord.isByBrokerOrAgent = post.isByBrokerOrAgent ? 1 : 0;
  return dbRecord;
}

export function postToDbRecord(post: CombinedPost): Record<string, any> {
  const dbRecord = combinedPostToDb(post);
  // Remove undefined values
  return Object.fromEntries(Object.entries(dbRecord).filter(([_, value]) => value !== undefined));
}


export function dbRecordToPost(dbRecord: Record<string, any>): CombinedPostFromDb | undefined {
  if(!dbRecord) {
    return 
  }
  const post = {
    id:  dbRecord.id,
    postId: dbRecord.postId,
    groupId: dbRecord.groupId,
    groupName: dbRecord.groupName || '',
    postUrl: dbRecord.postUrl,
    text: dbRecord.postText,
    allAttechments: JSON.parse(dbRecord.postAttachments) || [],
    phoneNumbers: JSON.parse(dbRecord.phoneNumbers) || [],
    creationTime: dbRecord.creationTime,
    createdAt: dbRecord.createdAt,
    updatedAt: dbRecord.updatedAt,
  } as CombinedPost & {
    createdAt: number;
    updatedAt: number;
    childPosts?: CombinedPost[];
    parentPosts?: CombinedPost[];
  };

  // Map extracted details from database fields
  post.isHouseRentalListing = Boolean(dbRecord.isHouseRentalListing);
  post.location = dbRecord.location || '';
  post.price = dbRecord.price !== null ? dbRecord.price : undefined;
  post.isPriceFlexible = Boolean(dbRecord.isPriceFlexible);
  post.isHouse = Boolean(dbRecord.isHouse);
  post.sizeInM2 = dbRecord.sizeInM2 !== null ? dbRecord.sizeInM2 : undefined;
  post.numberOfFloors = dbRecord.numberOfFloors !== null ? dbRecord.numberOfFloors : undefined;
  post.numberOfRooms = dbRecord.numberOfRooms !== null ? dbRecord.numberOfRooms : undefined;
  post.numberOfBedrooms = dbRecord.numberOfBedrooms !== null ? dbRecord.numberOfBedrooms : undefined;
  post.isForLongTerm = Boolean(dbRecord.isForLongTerm);
  post.hasParking = Boolean(dbRecord.hasParking);
  post.hasGarden = Boolean(dbRecord.hasGarden);
  post.isFullFurnished = Boolean(dbRecord.isFullFurnished);
  post.isPartiallyFurnished = Boolean(dbRecord.isPartiallyFurnished);
  post.doesPriceIncludeElectricity = Boolean(dbRecord.doesPriceIncludeElectricity);
  post.doesPriceIncludeWater = Boolean(dbRecord.doesPriceIncludeWater);
  post.doesPriceIncludeLocalTaxes = Boolean(dbRecord.doesPriceIncludeLocalTaxes);
  post.availableFrom = dbRecord.availableFrom || null;
  post.showingDate = dbRecord.showingDate || null;
  post.showingTime = dbRecord.showingTime || null;
  post.isNewConstruction = Boolean(dbRecord.isNewConstruction);
  post.isRenovated = Boolean(dbRecord.isRenovated);
  post.isByBrokerOrAgent = Boolean(dbRecord.isByBrokerOrAgent);

  if (dbRecord.childPosts) {
    post.childPosts = dbRecord.childPosts.map((c: any) => dbRecordToPost(c.childPost));
  } else {
    post.childPosts = [];
  }
  if (dbRecord.parentPosts) {
    post.parentPosts = dbRecord.parentPosts.map((c: any) => dbRecordToPost(c.parentPost));
  } else {
    post.parentPosts = [];
  }

  console.log(post);
  return post;
}