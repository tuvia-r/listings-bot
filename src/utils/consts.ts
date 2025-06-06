import ms from 'ms';

export const ATTACHMENTS_DIR = './.attachments';
export const MAPS_DIR = './.maps';

export const DB_FILE_NAME = process.env.DB_FILE_NAME || './dbs/sqlite.db';

export const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID as string;

export const EXTRACTOR_MAX_GROUP_SCROLL_TIME = ms(
    (process.env.EXTRACTOR_MAX_GROUP_SCROLL_TIME as ms.StringValue) ?? '10m',
);
export const EXTRACTOR_CONCURRENCY = Number.parseInt(process.env.EXTRACTOR_CONCURRENCY || '3');

export const EXTRACT_DETAILS_MODEL_ID = process.env.EXTRACT_DETAILS_MODEL_ID || 'gemini-2.0-flash';

export const EXTRACT_DETAILS_OUTPUT_LANGUAGE = process.env.EXTRACT_DETAILS_OUTPUT_LANGUAGE || 'English';

export const FACEBOOK_GROUP_SCROLLS_NUMBER = Number.parseInt(process.env.FACEBOOK_GROUP_SCROLLS_NUMBER || '50');

export const MAX_POST_AGE = ms((process.env.EXTRACTOR_MAX_POST_AGE as ms.StringValue) || '90d'); // Maximum age of posts to process, in milliseconds

export type FilterItem<T> = [keyof T, T[keyof T] | T[keyof T][]];

export enum PropertyType {
    House = 'House',
    Apartment = 'Apartment',
    Room = 'Room',
    Other = 'Other',
}

export enum ListingType {
    Rental = 'Rental',
    Sale = 'Sale',
}

export enum RentalType {
    ShortTerm = 'ShortTerm',
    LongTerm = 'LongTerm',
}

export const NOTIFICATION_FILTERS = [
    ['propertyType', PropertyType.House], // Only get house posts
    ['listingType', ListingType.Rental], // Only get rental listings
    ['rentalType', RentalType.LongTerm], // Only get long-term rentals
    ['isMarkedAsIrelevant', false], // Only get posts that are pending processing
] as FilterItem<any>[];
