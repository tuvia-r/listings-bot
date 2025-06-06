// a simple implementation of a task queue using node streams and sqlite backend
import Database from 'better-sqlite3';
import { scheduler } from 'node:timers/promises';
import { getLogger } from '../../utils/logger';

export function createQueue<T>(
    name: string,
    options: {
        concurrent?: number;
        batchSize?: number;
        id?: string;
        store: {
            type: string;
            dialect: string;
            dbPath: string;
        };
        retryDelay?: number;
        maxRetries?: number;
    },
) {
    const logger = getLogger(`queue:${name}`);
    logger.debug(`Creating queue with options: ${JSON.stringify(options)}`);
    const client = new Database(options.store.dbPath);
    client.pragma('journal_mode = WAL');
    client.exec(`CREATE TABLE IF NOT EXISTS queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        failure_reason TEXT DEFAULT NULL,
        retries INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        failed_at TIMESTAMP DEFAULT NULL,
        locked_at TIMESTAMP DEFAULT NULL
    )`);

    // triggers
    client.exec(`CREATE TRIGGER IF NOT EXISTS update_queue_timestamp
        AFTER UPDATE ON queue
        FOR EACH ROW
        BEGIN
            UPDATE queue SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
        END;`);

    // delete old items
    client.exec(`CREATE TRIGGER IF NOT EXISTS delete_item_after_max_retries
        AFTER UPDATE ON queue
        FOR EACH ROW
        BEGIN
            DELETE FROM queue WHERE id = NEW.id AND retries >= ${options.maxRetries || 3};
        END;`);
    client.exec(`CREATE TRIGGER IF NOT EXISTS set_failed_at
        AFTER UPDATE ON queue
        FOR EACH ROW
        BEGIN
            UPDATE queue SET failed_at = CURRENT_TIMESTAMP WHERE id = NEW.id AND status = 'failed';
        END;`);

    client.exec(`CREATE TRIGGER IF NOT EXISTS set_locked_at
        AFTER UPDATE ON queue
        FOR EACH ROW
        BEGIN
            UPDATE queue SET locked_at = CURRENT_TIMESTAMP WHERE id = NEW.id AND status = 'locked';
        END;`);

    // release locked items after a certain period
    client.exec(`CREATE TRIGGER IF NOT EXISTS release_locked_items
        AFTER UPDATE ON queue
        FOR EACH ROW
        BEGIN
            UPDATE queue SET status = 'pending', locked_at = NULL WHERE status = 'locked' AND (julianday('now') - julianday(locked_at)) * 24 * 60 * 60 > 60 * 5; -- release after 5 minutes
        END;`);

    client.exec(`CREATE TRIGGER IF NOT EXISTS release_locked_items_on_failure
        AFTER UPDATE ON queue
        FOR EACH ROW
        BEGIN
            UPDATE queue SET status = 'pending', locked_at = NULL WHERE id = NEW.id AND status = 'locked' AND status = 'failed';
        END;`);

    // indexes
    client.exec(`CREATE INDEX IF NOT EXISTS idx_queue_status ON queue (status)`);
    client.exec(`CREATE INDEX IF NOT EXISTS idx_queue_created_at ON queue (created_at)`);
    client.exec(`CREATE INDEX IF NOT EXISTS idx_queue_item ON queue (item)`);

    const subscribbers = new Set<(item: T) => void>();

    async function processQueue(): Promise<boolean> {
        if (subscribbers.size === 0) {
            return false; // no subscribers, nothing to process
        }
        const stmt = client.prepare(`SELECT * FROM queue WHERE status = 'pending' ORDER BY created_at LIMIT 1`);
        const row = stmt.get() as any; // better-sqlite3 returns rows as objects
        if (!row) {
            return false; // no items to process
        }
        const item: T = JSON.parse(row.item as string);
        try {
            logger.debug('Processing queue...');
            const updateStmt = client.prepare(`UPDATE queue SET status = 'locked' WHERE id = ?`);
            updateStmt.run(row.id);
            await Promise.all(
                Array.from(subscribbers).map((callback) => {
                    try {
                        return callback(item);
                    } catch (error: any) {
                        logger.error(`Error in subscriber callback: ${error?.message}`, { item });
                        return Promise.reject(error);
                    }
                }),
            );
            const successStmt = client.prepare(`UPDATE queue SET status = 'completed' WHERE id = ?`);
            successStmt.run(row.id);
            logger.debug(`Processed item successfully: ${JSON.stringify(item)}`);
        } catch (error: any) {
            const errorStmt = client.prepare(
                `UPDATE queue SET status = 'failed', failure_reason = ?, retries = retries + 1 WHERE id = ?`,
            );
            errorStmt.run(error?.message ?? 'unknown', row.id);

            if (options.retryDelay) {
                await scheduler.wait(options.retryDelay);
            }
            logger.error(`Failed to process item: ${JSON.stringify(item)}, error: ${error?.message ?? 'unknown'}`);
        }

        return true; // indicates that an item was processed
    }

    // process every second
    let isDestroyed = false;

    async function processQueueLoop(): Promise<void> {
        while (!isDestroyed) {
            const wasItemProcessed = await processQueue();
            if (wasItemProcessed) {
                const length = (await client
                    .prepare(`SELECT COUNT(*) as count FROM queue WHERE status = 'pending'`)
                    .get()) as any;
                logger.debug(`Current pending tasks: ${length.count}`);
            }
            await scheduler.wait(4); // wait for 4 milliseconds before checking again
        }
    }

    processQueueLoop().catch((err) => {
        console.error('Error processing queue:', err);
    });

    return {
        async push(item: T): Promise<void> {
            const insertStmt = client.prepare(`INSERT INTO queue (item, status) VALUES (?, 'pending')`);
            insertStmt.run(JSON.stringify(item));
        },
        async length(): Promise<number> {
            const countStmt = client.prepare(`SELECT COUNT(*) as count FROM queue WHERE status = 'pending'`);
            const row = countStmt.get() as any;
            return row.count || 0;
        },
        async waitForAll(): Promise<void> {
            while ((await this.length()) > 0) {
                await scheduler.wait(100); // wait for 100 milliseconds before checking again
            }
        },
        subscribe(callback: (item: T) => void) {
            subscribbers.add(callback);
            logger.debug(`Subscriber added: ${callback.name}`);
        },
        unsubscribe(callback: (item: T) => void) {
            subscribbers.delete(callback);
            logger.debug(`Subscriber removed: ${callback.name}`);
        },
        [Symbol.dispose]() {
            isDestroyed = true; // stop processing
            client.close(); // close the database connection
        },
    };
}
