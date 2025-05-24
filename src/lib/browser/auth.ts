import { readFile } from "fs/promises";
import { Browser } from "rebrowser-puppeteer";

const cookieFiles = [
    './config/www.facebook.com_cookies.json',
    'config/web.whatsapp.com_cookies.json'
];

export async function authenticate(browser: Browser) {
    for (const file of cookieFiles) {
        try {
            const data = await readFile(file, 'utf-8');
            const cookies = JSON.parse(data);
            if (Array.isArray(cookies)) {
                await browser.setCookie(...cookies);
                console.log(`Cookies loaded from ${file}`);
            }
        } catch (error) {
            console.error(`Failed to load cookies from ${file}:`, error);
        }
    }
}