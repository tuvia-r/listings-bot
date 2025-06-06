import { compact, get } from 'lodash-es';
import { getLogger } from '../../utils/logger';
import { ATTACHMENTS_DIR } from '../../utils/consts';

const logger = getLogger('group-feed-extractor');

export interface GroupFeedPostAttachment {
    type: 'photo' | 'video' | 'link';
    id: string;
    url: string;
    localPath: string;
}

export interface GroupFeedPost {
    postId: string;
    groupId: string | null;
    groupName: string | null;
    text: string;
    postAttachments: GroupFeedPostAttachment[];
    postUrl: string | null;
    publisherName: string | null;
    publisherUrl: string | null;
    publisherId: string | null;
    commentCount: number | null;
    childrenIds: string[] | null;
    children: GroupFeedPost[];
    creationTime?: number;
    reactionCount?: number;
}

export async function extractGroupFeedPost(post: any): Promise<GroupFeedPost[]> {
    const type: string = post.label || get(post, 'data.node.__typename') || '';
    logger.debug(`Extracting group feed post of type: ${type}`);
    let posts: GroupFeedPost[] = [];
    if (type === 'Group') {
        posts = await extractFromFeedInitial(post);
    }
    else {
        logger.debug(`Unknown post type: ${type}`);
    }

    const byId = new Map<string, GroupFeedPost>();
    for (const post of posts) {
        if (byId.has(post.postId)) {
            logger.warn(`Duplicate post found with ID: ${post.postId}, skipping...`);
            continue;
        }
        byId.set(post.postId, post);
    }

    return Array.from(byId.values());
}

async function extractFromFeedInitial(post: any): Promise<GroupFeedPost[]> {
    const posts: GroupFeedPost[] = [];

    const edges = get(post, 'data.node.group_feed.edges', []);
    logger.debug(`Extracting ${edges.length} posts from group feed`);

    if (edges.length === 0) {
        return [];
    }

    for (const edge of edges) {
        if (!edge || !edge.node) continue;

        const node = edge.node;
        posts.push(await extractFromNode(node));
    }

    return posts;
}

async function extractFromNode(node: any): Promise<GroupFeedPost> {
    const postId = get(node, 'post_id', '');
    const text =
        get(node, 'comet_sections.content.story.message.text') ||
        get(node, 'comet_sections.content.story.comet_sections.message.story.message.text') ||
        get(node, 'comet_sections.content.story.comet_sections.message_container.story.message.text') ||
        '';
    const groupId = get(node, 'to.id');
    const groupName = get(node, 'to.name');
    const allAttechments =
        get(node, 'comet_sections.content.story.attachments[0].styles.attachment.all_subattachments.nodes') ||
        get(node, 'attachments[0].styles.attachment.style_infos[0].fb_shorts_story.attachments') ||
        [];
    if (allAttechments.length === 0) {
        const singleAttachment = get(node, 'comet_sections.content.story.attachments[0].styles.attachment', null);
        if (singleAttachment && singleAttachment.media) {
            allAttechments.push(singleAttachment);
        }
    }
    const creationTime =
        get(node, 'comet_sections.timestamp.story.creation_time') ||
        get(node, 'comet_sections.context_layout.story.comet_sections.metadata[0].story.creation_time') ||
        get(
            node,
            'story.attached_story.comet_sections.attached_story_layout.story.comet_sections.metadata[0].story.creation_time',
        );
    const postUrl =
        get(node, 'comet_sections.feedback.story.story_ufi_container.story.url') ||
        get(node, 'comet_sections.timestamp.story.url');
    const publisherName = get(node, 'actors[0].name') || get(node, 'comet_sections.content.story.actors[0].id');
    const publisherUrl = get(node, 'actors[0].url') || get(node, 'comet_sections.content.story.actors[0].url');
    const publisherId = get(node, 'actors[0].id') || get(node, 'comet_sections.content.story.actors[0].id');
    const reactionCount = get(
        node,
        'comet_sections.feedback.story.story_ufi_container.story.feedback_context.feedback_target_with_context.comet_ufi_summary_and_actions_renderer.feedback.reaction_count.count',
    );
    const commentCount = get(
        node,
        'comet_sections.feedback.story.story_ufi_container.story.feedback_context.feedback_target_with_context.comet_ufi_summary_and_actions_renderer.feedback.comments_count_summary_renderer.feedback.comment_rendering_instance.comments.total_count',
    );
    const children: GroupFeedPost[] = [];

    const attachedStory = get(node, 'attached_story', null);
    if (attachedStory) {
        const attachedPost = await extractFromNode(attachedStory);

        if (attachedPost) {
            children.push(attachedPost);
        }
    }

    return {
        groupId: groupId ?? null,
        groupName: groupName || null,
        postId,
        text,
        postAttachments: compact(allAttechments.map(extractAttachment)),
        creationTime: creationTime ? creationTime * 1000 : undefined,
        postUrl: postUrl || null,
        publisherName: publisherName || null,
        publisherUrl: publisherUrl || null,
        publisherId: publisherId || null,
        reactionCount: reactionCount || null,
        commentCount: commentCount || null,
        childrenIds: children.map((child) => child.postId),
        children,
    };
}

function extractAttachment(attachment: any) {
    const type = get(attachment, 'media.__typename', '');
    const id = get(attachment, 'media.id');
    const localPath = `${ATTACHMENTS_DIR}/${id}`;

    logger.debug(`Extracting attachment of type: ${type}, id: ${id}, localPath: ${localPath}`);

    if (!id || !type) {
        logger.warn('Invalid attachment, missing id or type', attachment);
        return null;
    }

    if (type === 'Photo') {
        return {
            type: 'photo',
            id,
            localPath,
            url:
                get(attachment, 'media.image.uri') ||
                get(attachment, 'media.comet_photo_attachment_resolution_renderer.image.uri'),
        };
    } else if (type === 'Video') {
        const urls =
            get(
                attachment,
                'media.video_grid_renderer.video.videoDeliveryResponseFragment.videoDeliveryResponseResult.progressive_urls',
            ) ||
            get(attachment, 'media.videoDeliveryResponseFragment.videoDeliveryResponseResult.progressive_urls') ||
            [];
        return {
            type: 'video',
            id,
            localPath,
            url: urls.pop()?.progressive_url,
        };
    } else if (type === 'Link') {
        return {
            type: 'link',
            id,
            localPath,
            url: get(attachment, 'url', ''),
        };
    }
}
