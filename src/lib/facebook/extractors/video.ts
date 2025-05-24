import { createWriteStream } from "node:fs";
import { Browser } from "rebrowser-puppeteer";



export async function extractVideoFromFacebookPost(browser: Browser, videoPageUrl: string): Promise<string | null> {
    try {
        console.log('Extracting video from Facebook post:', videoPageUrl);
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');
        await page.goto(videoPageUrl, { waitUntil: 'networkidle2' });
        await page.waitForSelector('video', { timeout: 5000 });
        const videoElement = await page.$('video');
        if (!videoElement) {
            console.error('No video element found on the page.');
            return null;
        }
        const videoSrc = await page.evaluate((video) => {
            const source = video.querySelector('source');
            if (source) {
                return source.getAttribute('src');
            }
            return null;
        }, videoElement);
        if (!videoSrc) {
            console.error('No video source found in the video element.');
            return null;
        }
        const videoBlob = await page.evaluate((video) => {
            const source = video.querySelector('source');
            if (source) {
                return fetch(source.getAttribute('src')!).then(response => response.blob());
            }
            return null;
        }, videoElement);
        if (!videoBlob) {
            console.error('No video blob found in the video element.');
            return null;
        }
        const videoPath = `./.media/videos/video-${Date.now()}-${Math.floor(Math.random() * 10000)}.mp4`;
        const videoStream = createWriteStream(videoPath);
        videoStream.write(Buffer.from(await videoBlob.arrayBuffer()));
        videoStream.end();
        videoStream.on('finish', () => {
            console.log(`Video downloaded to ${videoPath}`);
        });
        await new Promise<void>((resolve) => videoStream.on('finish', resolve));
        return videoPath;
    } catch (error) {
        console.error('Error extracting video:', error);
        return null;
    }

}