import { HTTPResponse, Page } from 'rebrowser-puppeteer';
import { getLogger } from '../../utils/logger';
import { get, set } from 'lodash-es';

const logger = getLogger('facebook-intercept-graphql');

export type InterceptionCallback = (json: any) => any | Promise<any>;

async function extractJsonFromGraphQLResponse(response: HTTPResponse) {
    const responseBody = await response.text();

    // Parse each line of the response as a separate JSON object
    // Facebook often returns multiple JSON objects in a single response
    const parsedResponses = responseBody
        .split('\n')
        .map((line) => {
            if (!line || !line.trim()) return null;
            try {
                return JSON.parse(line);
            } catch (e) {
                logger.log('Failed to parse line:', line.substring(0, 100) + '...', e);
                return null;
            }
        })
        .filter((item) => item !== null);

    // Log structured data for debugging
    if (parsedResponses.length > 0) {
        logger.debug(`Successfully parsed ${parsedResponses.length} response objects from GraphQL response`);
    }

    // build the final JSON object
    // the first object is considered the "completed" JSON
    // and subsequent objects are merged into it

    const completedJson = parsedResponses.shift();

    for (const response of parsedResponses) {
        const { path = [], data } = response;
        if(path.length === 0 || !data) {
            logger.warn('Skipping response with empty path');
            logger.debug('Response content:', JSON.stringify(response, null, 2));
            continue;
        }
        path.unshift('data'); // Ensure the path starts with 'data'
        logger.debug(`Setting response at path: ${path}`);
        set(completedJson, path, {...get(completedJson, path), ...data});
    }

    return completedJson;
}

export async function interceptGraphQlResponses(page: Page, callback: InterceptionCallback) {
    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        interceptedRequest.continue();
    });

    page.on('response', async (interceptedResponse) => {
        const interceptedRequest = interceptedResponse.request();
        const url = interceptedRequest.url();

        // Only process GraphQL requests
        if (url === 'https://www.facebook.com/api/graphql/' && interceptedRequest.method() === 'POST') {
            try {
                // Get response body preview to check if it's relevant
                const responseBody = await interceptedResponse.text();

                // Check if it appears to be a relevant response that might contain posts
                const containsRelevantData = responseBody.includes('post_id');

                if (containsRelevantData) {
                    logger.debug('Found relevant GraphQL response with potential post data');
                    const jsonResponse = await extractJsonFromGraphQLResponse(interceptedResponse);
                    await callback(jsonResponse);
                }
            } catch (error) {
                logger.error('Error handling GraphQL response:', error);
            }
        }
    });
}
