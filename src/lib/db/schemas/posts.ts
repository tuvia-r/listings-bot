import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';
import { ExtractedPostDetails, ListingType, PropertyType, RentalType } from '../../llm/extract-post-details';
import { GroupFeedPost, GroupFeedPostAttachment } from '../../facebook/group-feed-extractor';
import { relations } from 'drizzle-orm';

/**
 * Combined type for posts including raw Facebook data and extracted details
 */
export type CombinedPost = GroupFeedPost & Partial<ExtractedPostDetails>;


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
  groupId: text('group_id', {}),
  groupName: text('group_name'),
  text: text('post_text').notNull(),
  postUrl: text('post_url'),
  postAttachments: text('post_attachments', {mode: 'json'}).$type<GroupFeedPostAttachment[]>().$default(() => sql`[]`),
  phoneNumbers: text('phone_numbers', {mode: 'json'}).$type<{ number: string; forWhatsApp: boolean; forPhoneCall: boolean; name?: string; }[]>().$default(() => sql`[]`),
  createdAt: real('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: real('updated_at').notNull().default(sql`(strftime('%s', 'now'))`),
  creationTime: real('post_creation_time').notNull().default(sql`(strftime('%s', 'now'))`),
  processingStatus: text('processing_status', {enum: Object.values(PostProcessingStatus) as [PostProcessingStatus, ...PostProcessingStatus[]]}).notNull().default(PostProcessingStatus.Pending),
  propertyType: text('property_type', {enum: Object.values(PropertyType) as [PropertyType, ...PropertyType[]]}),
  listingType: text('listing_type', {enum: Object.values(ListingType) as [ListingType, ...ListingType[]]}),
  rentalType: text('rental_type', {enum: Object.values(RentalType) as [RentalType, ...RentalType[]]}),
  location: text('location').notNull().default(''),
  price: real('price'),
  sizeInM2: real('size_in_m2'),
  numberOfFloors: integer('number_of_floors'),
  numberOfRooms: integer('number_of_rooms'),
  numberOfBedrooms: integer('number_of_bedrooms'),
  hasParking: integer('has_parking', {mode: 'boolean'}),
  hasGarden: integer('has_garden', {mode: 'boolean'}),
  isFullFurnished: integer('is_full_furnished', {mode: 'boolean'}),
  isPartiallyFurnished: integer('is_partially_furnished', {mode: 'boolean'}),
  doesPriceIncludeElectricity: integer('does_price_include_electricity', {mode: 'boolean'}),
  doesPriceIncludeWater: integer('does_price_include_water', {mode: 'boolean'}),
  doesPriceIncludeLocalTaxes: integer('does_price_include_local_taxes', {mode: 'boolean'}),
  availableFrom: text('available_from'),
  showingDate: text('showing_date'),
  showingTime: text('showing_time'),
  isByBrokerOrAgent: integer('is_by_broker_or_agent', {mode: 'boolean'}),
  postSummary: text('summary').notNull().default(''),
  postDescription: text('post_description').notNull().default(''),
  postLocation: text('post_location'),
  listingSize: text('listing_size'),
  postPrice: text('post_price'),
  postExtraDetails: text('post_extra_details'),
  postContactInfo: text('post_contact_info'),
  publisherName: text('publisher_name'),
  publisherUrl: text('publisher_url'),
  publisherId: text('publisher_id'),
  reactionCount: integer('reaction_count').default(0),
  isMarkedAsIrelevant: integer('is_marked_as_irelevant', {mode: 'boolean'})
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

export type PostWithRelations = typeof postsTable.$inferSelect & {
  childPosts?: (typeof PostToPostTable.$inferSelect & {
    childPost: typeof postsTable.$inferSelect;
  })[];
  parentPosts?: (typeof PostToPostTable.$inferSelect & {
    parentPost: typeof postsTable.$inferSelect;
  })[];
};

export function postToDbRecord(post: CombinedPost): typeof postsTable.$inferInsert {
  return {...post, id: post.postId}
}