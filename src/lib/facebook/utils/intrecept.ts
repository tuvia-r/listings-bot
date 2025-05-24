import { HTTPRequest, HTTPResponse, Page } from "rebrowser-puppeteer";


export type InterseptionEvent = {
    request: HTTPRequest;
    response: HTTPResponse;
    responseBody: any;
    error: Error | null;
};

export type InterceptionCallback = (event: InterseptionEvent) => void | Promise<void>;

async function handleGraphQLRequest(request: HTTPRequest, response: HTTPResponse, callback: InterceptionCallback) {
    const responseBody = await response.text();
    console.log(`GraphQL request detected at: ${request.url()}`);
    
    // Parse each line of the response as a separate JSON object
    // Facebook often returns multiple JSON objects in a single response
    const parsedResponses = responseBody.split('\n')
        .map(line => {
            if (!line || !line.trim()) return null;
            try {
                return JSON.parse(line);
            } catch (e) {
                console.log('Failed to parse line:', line.substring(0, 100) + '...');
                return null;
            }
        })
        .filter(item => item !== null);
    
    // Log structured data for debugging
    if (parsedResponses.length > 0) {
        console.log(`Successfully parsed ${parsedResponses.length} response objects from GraphQL response`);
    }
    
    await callback({
        request,
        response,
        responseBody: parsedResponses,
        error: null,
    });

    console.log('GraphQL response processing completed.');
}

export async function interceptGraphQlResponses(page: Page, callback: InterceptionCallback) {
    await page.setRequestInterception(true);

    page.on('request', interceptedRequest => {
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
                const containsRelevantData = 
                    responseBody.includes('post_id') || 
                    responseBody.includes('group_feed') || 
                    responseBody.includes('comet_sections') || 
                    responseBody.includes('story_card') ||
                    responseBody.includes('story_owner') ||
                    responseBody.includes('attachments') || 
                    responseBody.includes('Photo') ||
                    responseBody.includes('Video') ||
                    responseBody.includes('"actors"') ||
                    responseBody.includes('"comments"') ||
                    responseBody.includes('creation_time') ||
                    responseBody.includes('feedback');
                
                if (containsRelevantData) {
                    console.log('Found relevant GraphQL response with potential post data');
                    await handleGraphQLRequest(interceptedRequest, interceptedResponse, callback);
                }
            } catch (error) {
                console.error('Error handling GraphQL response:', error);
            }
        }
    });
}

