import { readFile } from 'fs/promises';
import { Browser } from 'rebrowser-puppeteer';
import { getLogger } from '../../utils/logger';

const logger = getLogger('browser-auth');

const cookieFiles = process.env.COOCKIE_FILES?.split(',') || [];

export async function authenticate(browser: Browser) {
    for (const file of cookieFiles) {
        try {
            const data = await readFile(file, 'utf-8');
            const cookies = JSON.parse(data);
            if (Array.isArray(cookies)) {
                await browser.setCookie(...cookies);
                logger.debug(`Cookies loaded from ${file}`);
            }
        } catch (error) {
            logger.error(`Failed to load cookies from ${file}:`, error);
        }
    }
}
