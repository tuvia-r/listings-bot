import { PostWithRelations } from '../lib/db/schemas/posts';
import { searchCoords } from '../lib/maps/coords';
import { createStaticMap } from '../lib/maps/static';
import { MAPS_DIR } from '../utils/consts';

export async function generatePostStaticMapAttachment(post: PostWithRelations) {
    const location = post.location || post.childPosts?.[0]?.childPost.location;
    if (location) {
        const locationCoords = await searchCoords(location);
        if (locationCoords) {
            const mapPath = `${MAPS_DIR}/${post.postId}-map.png`;
            await createStaticMap(locationCoords, mapPath);
            return {
                type: 'photo',
                localPath: mapPath,
            } as const;
        }
    }
}
