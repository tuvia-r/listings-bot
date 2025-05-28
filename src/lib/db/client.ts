import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { PostRelations, postsTable, PostToPostRelations, PostToPostTable } from './schemas/posts';
import { dirname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { getLogger } from '../../utils/logger';
import { DB_FILE_NAME } from '../../utils/consts';

const logger = getLogger('db-client');

const dbDir = dirname(DB_FILE_NAME);
if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
}

const db = Database(DB_FILE_NAME);
export const client = drizzle(db, {
    // logger: true,
    schema: {
        postsTable,
        PostToPostTable,
        PostRelations,
        PostToPostRelations,
    },
});

export function migrateDb() {
    logger.debug('Starting database migration...');
    try {
        migrate(client, {
            migrationsFolder: './drizzle',
        });
        logger.debug('Database migration completed.');
    } catch (error) {
        logger.error('Database migration failed:', error);
        throw error; // Re-throw to handle it in the main execution
    }
}
