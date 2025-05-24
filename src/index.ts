import { migrateDb } from './lib/db/client'
import { sendExamplePost } from './lib/telegram/demo';
import { fetchPostsOperation } from './operations/fetch-posts-operation';
import { updateChannelWithNewPosts } from './operations/update-channel-operation';

export async function main ()  {
    await migrateDb();
    // await sendExamplePost();

    await fetchPostsOperation(process.env.FACEBOOK_GROUP_ID!);
    await updateChannelWithNewPosts();
};

migrateDb()
main().catch(error => console.error('Error in main execution:', error));