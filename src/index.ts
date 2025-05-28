import { scheduler } from 'timers/promises';
import { migrateDb } from './lib/db/client';
import { fetchPostsOperation } from './operations/fetch-posts-operation';
import { updateChannelWithNewPosts } from './operations/update-channel-operation';
import { getBrowser } from './lib/browser/puppeteer';
import { readFile } from 'fs/promises';
import { getLogger } from './utils/logger';
import pMap from 'p-map';
import { EXTRACTOR_MAX_GROUP_SCROLL_TIME, EXTRACTOR_CONCURRENCY } from './utils/consts';

const logger = getLogger('main');

export async function main() {
    await migrateDb();

    const groupIds = JSON.parse(await readFile('./config/groups.json', 'utf-8')) as string[];

    const browserInstance = await getBrowser();

    try {
        await pMap(
            groupIds,
            async (groupId) => {
                logger.info(`Starting scraping for group ID: ${groupId.trim()}`);
                try {
                    await Promise.race([fetchPostsOperation(groupId.trim(), browserInstance), scheduler.wait(EXTRACTOR_MAX_GROUP_SCROLL_TIME)]);
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
        // Ensure browser is closed even if an error occurs
    }

    logger.info('All scraping operations completed. Closing browser...');
    browserInstance.close().catch((error) => logger.error('Error closing browser:', error));

    logger.info('Processing posts, and updating channel...');
    await updateChannelWithNewPosts();
    logger.info('Finished processing posts.');

    logger.info('Group IDs processed:', groupIds);

    process.exit(0);
}

migrateDb();
main().catch((error) => logger.error('Error in main execution:', error));
