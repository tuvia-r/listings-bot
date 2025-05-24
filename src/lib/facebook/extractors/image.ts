import { writeFileSync } from "node:fs";
import { Browser } from "rebrowser-puppeteer";



export async function extractImageFromFacebookPost(browser: Browser, imageUrl: string): Promise<string | null> {
    try {
        console.log('Extracting image from Facebook post:', imageUrl);
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');
        await page.goto(imageUrl, { waitUntil: 'networkidle2' });

        // Wait for the image to load
        const imageElement = await page.waitForSelector('img[src*="fbcdn"]', { timeout: 5000 });
        if (!imageElement) {
            console.error('Image element not found');
            return null;
        }

        const imageSrc = await imageElement.evaluate(el => el.getAttribute('src'));
        if (!imageSrc) {
            console.error('Image source not found');
            return null;
        }

        const imagePath = `./.media/images/${Date.now()}.jpg`;
        const viewSource = await page.goto(imageSrc);
        if (!viewSource) {
            console.error('Failed to fetch image source');
            return null;
        }
        const buffer = await viewSource.buffer();
        writeFileSync(imagePath, buffer);
        console.log(`Image saved to ${imagePath}`);
        await page.close();
        return imagePath;
    } catch (error) {
        console.error('Error extracting image:', error);
        return null;
    }

}