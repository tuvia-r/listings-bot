import { interceptGraphQlResponses } from "./utils/intrecept";
import { getBrowser } from "../browser/puppeteer";
import { scheduler } from "timers/promises";
import { authenticate } from "../browser/auth";
import { extractPostData, FormattedFacebookPost } from "./extractors/post";

export async function* groupPosts(groupId: string) {
    const browserInstance = await getBrowser();

    await authenticate(browserInstance);

    const page = await browserInstance.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');

    // Track processed post IDs to avoid duplicates
    const processedPostIds = new Set<string>();

    // Store all posts with the correct FormattedFacebookPost type
    const allPosts: FormattedFacebookPost[] = [];
    const maxPosts = 300;

    // Intercept GraphQL responses to extract post data
    await interceptGraphQlResponses(page, async (event) => {
        const { responseBody } = event;
        console.log(`GraphQL response detected at: ${event.request.url()}`);
        if (Array.isArray(responseBody)) {
            for (const item of responseBody) {
                if (!item) continue;
                if (allPosts.length >= maxPosts) {
                    console.log('Max posts limit reached, stopping extraction...');
                    break;
                }

                // Pass the groupId to extractPostData for correct URL generation
                const formattedPosts = await extractPostData(item, browserInstance, groupId);
                console.log(`Extracted ${formattedPosts.length} initial posts from GraphQL response`);
                for (const post of formattedPosts) {
                    if (post.postId && !processedPostIds.has(post.postId)) {
                        processedPostIds.add(post.postId);
                        allPosts.push(post);
                    }
                }
                await scheduler.wait(1000 * 10); // Wait for 1 second between processing posts
            }
        }
    });

    await page.goto(`https://www.facebook.com/groups/${groupId}/`, {
        waitUntil: 'networkidle2',
        timeout: 1000 * 60,
    });

    async function scroll() {
        await page.evaluate(() => {
            document.scrollingElement?.scrollTo(0, document.scrollingElement.scrollHeight);
        });
        // Wait for new posts to load 
        await scheduler.wait(1000 * (Math.random() * 10) + (1000 * 60));
    }

    console.log('Page loaded, waiting for initial content...');
    await scroll();

    let yieldPointer = 0;
    let emptyAttemptsCount = 0;
    const maxEmptyAttempts = 5;
    while (emptyAttemptsCount < maxEmptyAttempts && allPosts.length < maxPosts) {
        await scroll();

        // Check if new posts have been loaded
        const newPosts = allPosts.slice(yieldPointer);
        console.log(`New posts found: ${newPosts.length}`);
        if (newPosts.length > 0) {
            yield* newPosts;
            yieldPointer += newPosts.length;
        } else {
            console.log('No new posts found, shutting down...');
            emptyAttemptsCount++;
        }
    }

    await browserInstance.close();
    console.log('Browser closed.');
}