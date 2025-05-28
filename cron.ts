import cron from 'node-cron';
import { spawn } from 'child_process';
import { logDone, logError, logStart } from './src/lib/telegram/logs';
import { getLogger } from './src/utils/logger';

const logger = getLogger('cron');

async function executeScheduledTask() {
    logStart()
        .then(() => logger.info('Log start message sent successfully.'))
        .catch((err) => logger.error('Error sending log start message:', err));

    const child = spawn('npm', ['run', 'start'], {
        shell: true,
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' },
    });

    let err = '';
    child.stderr?.on('data', (data: Buffer) => {
        err += data.toString();
    });

    child.on('close', (code: number) => {
        if (err) {
            logError(new Error(`Process encountered an error: ${err}`))
                .then(() => logger.error('Log error message sent successfully.'))
                .catch((err) => logger.error('Error sending log error message:', err));
        }
        if (code === 0) {
            logDone('Cron job executed successfully.')
                .then(() => logger.info('Log done message sent successfully.'))
                .catch((err) => logger.error('Error sending log done message:', err));
        } else {
            logError(new Error(`Process exited with code ${code}`))
                .then(() => logger.error('Log error message sent successfully.'))
                .catch((err) => logger.error('Error sending log error message:', err));
            logger.error(`Process exited with code ${code}`);
        }
    });
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
