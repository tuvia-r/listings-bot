import ms from 'ms';
import { createQueue } from './queue';

export const notificationsQueue = createQueue<string>('notification-queue', {
    concurrent: 1,
    batchSize: 1,
    retryDelay: ms('30s'),
    maxRetries: 3,
    store: {
        type: 'sql',
        dialect: 'sqlite',
        dbPath: './.dbs/notification-queue.db',
    },
});
