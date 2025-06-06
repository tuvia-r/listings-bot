import { interceptGraphQlResponses } from './intrecept-graphql';
import { scheduler } from 'timers/promises';
import { Browser } from 'rebrowser-puppeteer';
import { getLogger } from '../../utils/logger';
import { facebookPostsQueue } from '../queues/facebook-post-queue';
import { extractGroupFeedPost } from './group-feed-extractor';

const logger = getLogger('group-posts-scroller');

export async function scrollGroupFeed(groupId: string, browserInstance: Browser, numberOfScrolles: number): Promise<void> {
    const page = await browserInstance.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    );

    await interceptGraphQlResponses(page, async (data: any) => {
        const posts = await extractGroupFeedPost(data);
        for (const post of posts) {
            logger.info(`Found post with ID: ${post.postId}`);
            await facebookPostsQueue.push({
                ...post,
                groupId,
            });
        }
        logger.info(`Total posts found: ${posts.length}`);
    });

    await page.goto(`https://www.facebook.com/groups/${groupId}/`, {
        waitUntil: 'networkidle2',
        timeout: 1000 * 30,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of Array(numberOfScrolles)) {
        logger.info('Scrolling group page...');

        await page.evaluate(() => {
            document.scrollingElement?.scrollTo(0, document.scrollingElement.scrollHeight);
        });
        // Wait for new posts to load
        await scheduler.wait(1000 * (Math.random() * 10));
    }
}
