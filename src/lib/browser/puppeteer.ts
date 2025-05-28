import puppeteer from 'rebrowser-puppeteer';
import { authenticate } from './auth';

export async function getBrowser() {
    const browser = await puppeteer.launch({
        // headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--enable-automation'],
        defaultViewport: {
            width: 1280,
            height: 800,
            deviceScaleFactor: 2,
        },
    });
    await authenticate(browser);
    return browser;
}
