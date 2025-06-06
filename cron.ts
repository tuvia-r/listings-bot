import cron from 'node-cron';
import { run } from './src';
import { logDone, logError, logStart } from './src/lib/telegram/logs';
import { getLogger } from './src/utils/logger';

const logger = getLogger('cron');

async function executeScheduledTask() {
    try {
        logger.info('Executing scheduled task...');
        await logStart();
        logger.info('Starting cron job execution...');
        await run();
        logger.info('Cron job executed successfully.');
        await logDone('Cron job executed successfully.');
        logger.info('Scheduled task completed successfully.');
    } catch (err) {
        logger.error('Error executing scheduled task:', err);
        await logError(new Error(`Scheduled task execution failed: ${err}`)).catch((error) => {
            logger.error('Error logging the error:', error);
        });
    }
}

// Schedule at 09:00, 12:00, 17:00, 22:00 every day
const times = process.env.CRON_TIMES?.split(',').map((time) => time.trim()) || [];

if (times.length === 0) {
    logger.warn('No cron times specified. Using default times: 09:00, 12:00, 17:00, 22:00.');
    times.push('0 9 * * *', '0 12 * * *', '0 17 * * *', '0 22 * * *');
}

times.forEach((time) => {
    cron.schedule(time, executeScheduledTask, {
        timezone: 'Asia/Jerusalem', // Set your desired timezone
    });
});

// runStart(); // Run immediately on startup

logger.info(`Cron job scheduled with times: ${times.join(', ')}`);
