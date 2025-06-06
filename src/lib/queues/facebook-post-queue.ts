import { createQueue } from './queue';

export const facebookPostsQueue = createQueue<{ postId: string; groupId: string } & any>(
    'facebook-post-queue',
    {
        concurrent: 1,
        batchSize: 1,
        id: 'postId',
        store: {
            type: 'sql',
            dialect: 'sqlite',
            dbPath: './.dbs/facebook-post-queue.db'
        },
        retryDelay: 1000,
        maxRetries: 3
    }
);
