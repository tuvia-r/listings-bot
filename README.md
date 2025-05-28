# Rent Posts Scraper (listings-bot)

## Motivation

Finding a rental House often means scrolling through hundreds of Facebook group posts every day. Most posts are irrelevant, poorly formatted, or missing key details. This process is time-consuming, and frustrating.

**Rent Posts Scraper** automates this process: it collects new posts from Facebook groups, uses AI to extract and structure the relevant details, and delivers only the most useful listings directly to a Telegram channel. This saves hours of manual scrolling and ensures you never miss a relevant opportunity.

## Features

- **Facebook Group Scraping:** Extracts posts from specified Facebook groups using Puppeteer.
- **AI-Powered Extraction:** Uses LLMs to parse and extract structured data (price, size, location, contact info, etc.) from unstructured post content.
- **Database Storage:** Stores posts and extracted details in a SQLite database using Drizzle ORM.
- **Telegram Integration:** Sends formatted listings to a Telegram channel using the grammy library.
- **Scheduling:** Supports scheduled scraping and posting via node-cron.
- **Static Maps:** Generates static map images for listings using staticmaps and Google Maps APIs.
- **Logging:** Uses winston for robust logging.
- **Configurable:** All credentials and group lists are managed via config files.

## How it Works (Flow)

1. **Scraping:** The bot logs into Facebook using Puppeteer and fetches new posts from configured groups.
2. **AI Extraction:** Each post is sent to an LLM (Anthropic or Google GenAI) to extract structured details such as price, size, location, contact info, and availability.
3. **Database Storage:** Extracted posts are saved in a local SQLite database via Drizzle ORM, ensuring no duplicates and enabling easy querying.
4. **Formatting:** Posts are formatted using a Telegram-compatible HTML template, including static map images for locations.
5. **Delivery:** The bot sends the formatted posts to a Telegram channel using the grammy library.
6. **Scheduling:** The process can be run on demand or scheduled to run periodically using node-cron.

## Project Structure

- `src/` — Main source code
    - `facebook/` — Facebook scraping and extraction logic
    - `llm/` — AI extraction utilities
    - `telegram/` — Telegram bot and posting logic
    - `db/` — Database client and schema
    - `maps/` — Static map generation
    - `utils/` — Utility functions and constants
- `assets/` — Templates and images for posts
- `config/` — Environment variables, cookies, and group lists
- `drizzle/` — Database migration files

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Facebook account (for scraping)
- Telegram bot token and channel

### Installation

1. Clone the repository:

    ```sh
    git clone <repo-url>
    cd rent-posts-scraper
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up configuration:

    - Copy and edit `config/config.env` with your environment variables.
    - Add your Facebook cookies to `config/www.facebook.com_cookies.json`.
    - List target Facebook groups in `config/groups.json`.
    - Add your Telegram bot token and channel ID to the config.

4. Build the project:
    ```sh
    npm run build
    ```

### Usage

- **Run the main bot:**
    ```sh
    npm start
    ```
- **Run scheduled scraping:**
    ```sh
    npm run schedule
    ```

## Environment Variables

The following environment variables are used in `config/config.env`:

- `FACEBOOK_USERNAME` — Facebook login email/username
- `FACEBOOK_PASSWORD` — Facebook login password
- `GEMINI_API_KEY` — Google Gemini API key for LLM extraction
- `DB_FILE_NAME` — Path to the SQLite database file
- `TELEGRAM_BOT_TOKEN` — Telegram bot token
- `TELEGRAM_GROUP_ID` — Telegram group/channel ID to post listings
- `EXTRACT_DETAILS_MODEL_ID` — LLM model ID for extracting post details
- `GOOGLE_MAPS_API_KEY` — Google Maps API key for static map generation
- `EXTRACT_DETAILS_OUTPUT_LANGUAGE` — Output language for extracted details (e.g., 'hebrew')
- `EXTRACTOR_MAX_NEW_POSTS_ADDED` — Max new posts to add per run
- `EXTRACTOR_MAX_POST_SCROLLED` — Max posts to scroll per group per run
- `EXTRACTOR_MAX_POST_AGE` — Max age of posts to consider (e.g., '90d')
- `EXTRACTOR_MAX_GROUP_SCROLL_TIME` — Max time to scroll a group (e.g., '10m')
- `EXTRACTOR_CONCURRENCY` — Number of groups to process in parallel
- `COOCKIE_FILES` — Path to Facebook cookies file
- `CRON_TIMES` — Comma-separated cron expressions for scheduling scraping

## Customization

- **Post Template:** Edit `assets/post-template.md` to change the Telegram message format.
- **Groups:** Add/remove Facebook group IDs in `config/groups.json`.

## Development

- TypeScript strict mode is enabled.
- Code is auto-formatted with Prettier (with the tsbs plugin for TypeScript best standards). Run `npm run format` to format the codebase manually.
- A Prettier config file (`prettier.config.js`) is included for formatting rules.
- Husky is set up to run `npm run lint:fix` and `npm run format` automatically before each commit (pre-commit hook).
- Database migrations are managed with Drizzle ORM.
- Linting is set up with ESLint (TypeScript support included).
- Run `npm run lint` to check code style, and `npm run lint:fix` to auto-fix issues.

## Scripts

- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run the main bot
- `npm run schedule` — Run scheduled scraping
- `npm run db:generate` — Generate Drizzle ORM types
- `npm run lint` — Run ESLint on the codebase
- `npm run lint:fix` — Auto-fix lint issues

## Dependencies

- puppeteer
- drizzle-orm, better-sqlite3
- grammy (Telegram bot)
- staticmaps, sharp
- winston (logging)
- node-cron (scheduling)
- LLM SDKs: @google/genai
- zod (validation), lodash-es, ms, p-map, p-retry

## License

MIT

## Author

Tuvia Rumpler
