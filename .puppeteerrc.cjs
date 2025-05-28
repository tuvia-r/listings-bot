const { join } = require('path');
/**
 * @type {import("rebrowser-puppeteer").Configuration}
 */
module.exports = {
    // Download Chrome (default `skipDownload: false`).
    chrome: {
        skipDownload: false,
        version: 'latest',
    },
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
