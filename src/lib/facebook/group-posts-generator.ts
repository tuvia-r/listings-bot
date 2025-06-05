import { interceptGraphQlResponses } from './intrecept-graphql';
import { scheduler } from 'timers/promises';
import { extractGroupFeedPost, GroupFeedPost } from './group-feed-extractor';
import { Browser } from 'rebrowser-puppeteer';
import { getLogger } from '../../utils/logger';

const logger = getLogger('group-posts-generator');

export async function* groupPosts(groupId: string, browserInstance: Browser) {
    const page = await browserInstance.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    );

    // Track processed post IDs to avoid duplicates
    const processedPostIds = new Set<string>();

    // Store all posts with the correct FormattedFacebookPost type
    const allPosts: GroupFeedPost[] = [];
    const maxPosts = 300;

    // Intercept GraphQL responses to extract post data
    await interceptGraphQlResponses(page, async (event) => {
        const { responseBody } = event;
        logger.debug(`GraphQL response detected at: ${event.request.url()}`);
        if (Array.isArray(responseBody)) {
            for (const item of responseBody) {
                if (!item) continue;
                if (allPosts.length >= maxPosts) {
                    logger.info('Max posts limit reached, stopping extraction...');
                    break;
                }

                const extractedPosts = await extractGroupFeedPost(item);
                for (const post of extractedPosts) {
                    if (processedPostIds.has(post.postId)) {
                        logger.info(`Post with ID ${post.postId} already processed, skipping...`);
                        continue; // Skip already processed posts
                    }
                    processedPostIds.add(post.postId); // Mark this post as processed
                    allPosts.push(post);
                    logger.debug(`Post with ID ${post.postId} extracted and added to allPosts.`);
                }
            }
        }
    });

    await page.goto(`https://www.facebook.com/groups/${groupId}/`, {
        waitUntil: 'networkidle2',
        timeout: 1000 * 30,
    });

    async function scroll() {
        await page.evaluate(() => {
            document.scrollingElement?.scrollTo(0, document.scrollingElement.scrollHeight);
        });
        // Wait for new posts to load
        await scheduler.wait(1000 * (Math.random() * 10));
    }

    logger.info('Page loaded, waiting for initial content...');
    await scroll();

    let yieldPointer = 0;
    let emptyAttemptsCount = 0;
    const maxEmptyAttempts = 5;
    while (emptyAttemptsCount < maxEmptyAttempts && allPosts.length < maxPosts) {
        await scroll();

        // Check if new posts have been loaded
        const newPosts = allPosts.slice(yieldPointer);
        logger.debug(`New posts found: ${newPosts.length}`);
        if (newPosts.length > 0) {
            yield* newPosts;
            yieldPointer += newPosts.length;
        } else {
            logger.debug('No new posts found');
            emptyAttemptsCount++;
        }
    }

    page.close();
}
