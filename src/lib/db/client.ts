import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { PostRelations, postsTable, PostToPostRelations, PostToPostTable } from './schemas/posts';
import { dirname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

const dbDir = dirname(process.env.DB_FILE_NAME!);
if(!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
}

const db = Database(process.env.DB_FILE_NAME!);
export const client = drizzle(db, {
    // logger: true,
    schema: {
        postsTable,
        PostToPostTable,
        PostRelations,
        PostToPostRelations
    }
});

export function migrateDb() {
    console.log('Starting database migration...');
    migrate(client, {
        migrationsFolder: './drizzle'
    });
    console.log('Database migration completed.');
}