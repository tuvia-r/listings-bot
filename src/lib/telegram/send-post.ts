import { PostWithRelations } from '../db/schemas/posts';
import { readFile } from 'fs/promises';

function getPostDateInfo(post: PostWithRelations): string {
    const childPostDate = post.childPosts?.[0]?.childPost.creationTime;
    const creationTime = post.creationTime || childPostDate;
    const hasTwoDates = post.creationTime && childPostDate && post.creationTime !== childPostDate;
    const hasDate = Boolean(creationTime || childPostDate);
    if (!hasDate) return '';
    const dateText = hasTwoDates
        ? `${new Date(post.creationTime!).toLocaleDateString('he-IL')} / ${new Date(childPostDate!).toLocaleDateString('he-IL')}`
        : `${new Date(creationTime!).toLocaleDateString('he-IL')}`;
    return creationTime ? dateText : '';
}

/**
 * Format a CombinedPost into a nice Telegram message
 */
export async function formatPostMessage(post: PostWithRelations): Promise<string> {
    const postMdTemplate = await readFile('./assets/post-template.md', 'utf-8');

    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${post.postLocation}`;

    const originalText = [post.text, ...(post.childPosts?.map((child) => child.childPost.text) || [])].join(
        '\n --- \n',
    );

    const postMkdn = postMdTemplate
        .replace('$title$', post.postSummary ?? '-')
        .replace('$originalUrl$', post.postUrl ?? '-')
        .replace('$content$', post.postDescription ?? '-')
        .replace('$original$', originalText || '-')
        .replace('$price$', post.postPrice ?? 'לא צויין מחיר')
        .replace('$location$', post.postLocation ?? '-')
        .replace('$locationUrl$', locationUrl)
        .replace('$size$', post.listingSize ?? 'לא צויין גודל')
        .replace(
            '$availableFrom$',
            post.availableFrom ? new Date(post.availableFrom).toLocaleDateString('he-IL') : 'לא צויין',
        )
        .replace('$extraDetails$', post.postExtraDetails ?? '')
        .replace('$contactInfo$', post.postContactInfo ?? 'לא צויין פרטי קשר')
        .replace('$date$', getPostDateInfo(post));

    return postMkdn;
}