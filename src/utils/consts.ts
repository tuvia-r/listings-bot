import ms from "ms";


export const ATTACHMENTS_DIR = './.attachments';
export const MAPS_DIR = './.maps';

export const DB_FILE_NAME = process.env.DB_FILE_NAME || './dbs/sqlite.db';

export const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID as string;

export const EXTRACTOR_MAX_GROUP_SCROLL_TIME = ms(process.env.EXTRACTOR_MAX_GROUP_SCROLL_TIME as ms.StringValue ?? "10m");
export const EXTRACTOR_CONCURRENCY = Number.parseInt(process.env.EXTRACTOR_CONCURRENCY || "3");

export const EXTRACT_DETAILS_MODEL_ID =  process.env.EXTRACT_DETAILS_MODEL_ID || 'gemini-2.0-flash'

export const EXTRACT_DETAILS_OUTPUT_LANGUAGE =process.env.EXTRACT_DETAILS_OUTPUT_LANGUAGE || 'English'

export const MAX_NEW_POSTS = Number.parseInt(process.env.EXTRACTOR_MAX_NEW_POSTS_ADDED || "50"); // Maximum number of new posts to process
export const MAX_POSTS = Number.parseInt(process.env.EXTRACTOR_MAX_POST_SCROLLED || "100"); // Maximum number of posts to process

export const MAX_POST_AGE = ms(process.env.EXTRACTOR_MAX_POST_AGE as ms.StringValue || "90d"); // Maximum age of posts to process, in milliseconds