import { scheduler } from 'timers/promises';
import { migrateDb } from './lib/db/client'
import { fetchPostsOperation } from './operations/fetch-posts-operation';
import { updateChannelWithNewPosts } from './operations/update-channel-operation';
import { getBrowser } from './lib/browser/puppeteer';


export async function main ()  {
    await migrateDb();

    const groupIds = process.env.FACEBOOK_GROUP_IDS?.split(',') || [];
    const scrapingPromises = [];
    const browserInstance = await getBrowser();
    for (const groupId of groupIds) {
        scrapingPromises.push(fetchPostsOperation(groupId.trim(), browserInstance));
        await scheduler.wait(20 + (1000 * (Math.random() * 10))); // Random delay between 0 and 10 seconds
    }

    try {
        await Promise.race([
            await Promise.all(scrapingPromises),
            scheduler.wait(60000 * 10) // Timeout after 10 minutes
        ]);
    }
    catch (error) {
        console.error('Error during scraping operations:', error);
    }

    await browserInstance.close();
    console.log('Browser closed.');

    await updateChannelWithNewPosts();
    console.log('Finished processing posts.');

    console.log('Group IDs processed:', groupIds);

    process.exit(0);
};

migrateDb()
main().catch(error => console.error('Error in main execution:', error));