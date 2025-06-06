import {
    EXTRACTOR_MAX_GROUP_SCROLL_TIME,
    EXTRACTOR_CONCURRENCY,
    FACEBOOK_GROUP_SCROLLS_NUMBER,
    MAPS_DIR,
    DB_FILE_NAME,
    ATTACHMENTS_DIR,
} from './utils/consts';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// Ensure necessary directories exist

if (!existsSync(MAPS_DIR)) {
    mkdirSync(MAPS_DIR, { recursive: true });
}

const dbDir = dirname(DB_FILE_NAME);
if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
}

if (!existsSync(ATTACHMENTS_DIR)) {
    mkdirSync(ATTACHMENTS_DIR, { recursive: true });
}

import { scheduler } from 'timers/promises';
import { migrateDb } from './lib/db/client';
import { getBrowser } from './lib/browser/puppeteer';
import { readFile } from 'fs/promises';
import { getLogger } from './utils/logger';
import pMap from 'p-map';
import { scrollGroupFeed } from './lib/facebook/group-scroller';
import './operations/facebook-operations';
import './operations/notifications-oprations';
import { facebookPostsQueue } from './lib/queues/facebook-post-queue';
import { onFacebookPost } from './operations/facebook-operations';
import { notificationsQueue } from './lib/queues/notification-queue';
import { onNotification } from './operations/notifications-oprations';

const logger = getLogger('main');

export async function main() {
    await migrateDb();
    facebookPostsQueue.subscribe(onFacebookPost);
    notificationsQueue.subscribe(onNotification);

    const groupIds = JSON.parse(await readFile('./config/groups.json', 'utf-8')) as string[];

    const browserInstance = await getBrowser();

    try {
        await pMap(
            groupIds,
            async (groupId) => {
                logger.info(`Starting scraping for group ID: ${groupId.trim()}`);
                try {
                    await Promise.race([
                        scrollGroupFeed(groupId.trim(), browserInstance, FACEBOOK_GROUP_SCROLLS_NUMBER),
                        scheduler.wait(EXTRACTOR_MAX_GROUP_SCROLL_TIME),
                    ]);
                    logger.info(`Completed scraping for group ID: ${groupId.trim()}`);
                } catch (error) {
                    logger.error(`Error scraping group ID ${groupId.trim()}:`, error);
                }
            },
            {
                concurrency: EXTRACTOR_CONCURRENCY,
                stopOnError: false,
            },
        );
    } catch (error) {
        logger.error('Error during scraping operations:', error);
    } finally {
        await browserInstance.close();
        logger.info('Browser instance closed.');
    }
    await facebookPostsQueue.waitForAll();
    await notificationsQueue.waitForAll();
    logger.info('All scraping operations completed.');
}

if (require.main === module) {
    main()
        .then(() => {
            logger.info('Scraping completed successfully.');
            process.exit(0);
        })
        .catch((error) => {
            logger.error('Error in main execution:', error);
            process.exit(1);
        });
}
export { main as run } from './index';
