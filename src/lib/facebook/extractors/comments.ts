import { FacebookComment } from '../utils/graphql';

/**
 * Extract comments from raw comment data
 */
export function extractCommentsFromRaw(rawComments: { comment: any }[], postId: string): FacebookComment[] {
    return rawComments.map(commentData => {
        const comment = commentData.comment;
        return {
            id: comment.id,
            commentId: comment.id,
            postId: postId,
            commentText: comment.body?.text || '',
            commentAuthorName: comment.author?.name || '',
            commentAuthorId: comment.author?.id || '',
            commentAuthorUrl: comment.author?.url,
            timestamp: comment.created_time ? new Date(comment.created_time * 1000).toISOString() : undefined,
            commentUrl: comment.url
        };
    });
}

/**
 * Extract comments from edges data
 */
export function extractCommentsFromEdges(edges: { node?: any }[]): FacebookComment[] {
    const comments: FacebookComment[] = [];
    
    for (const edge of edges) {
        if (!edge.node) continue;
        
        const comment = edge.node;
        const commentId = comment.id;
        let postId = '';
        
        // Try to extract post ID from comment URL or action links
        if (comment.comment_action_links && comment.comment_action_links.length > 0) {
            for (const link of comment.comment_action_links) {
                if (link.comment?.url) {
                    const urlMatch = link.comment.url.match(/\/posts\/(\d+)/);
                    if (urlMatch && urlMatch[1]) {
                        postId = urlMatch[1];
                        break;
                    }
                }
            }
        }
        
        comments.push({
            id: commentId,
            commentId: commentId,
            postId: postId,
            commentText: comment.body?.text || '',
            commentAuthorName: comment.author?.name || '',
            commentAuthorId: comment.author?.id || '',
            commentAuthorUrl: comment.author?.url,
            timestamp: comment.created_time ? new Date(comment.created_time * 1000).toISOString() : undefined,
            commentUrl: comment.url
        });
    }
    
    return comments;
}

/**
 * Extract post ID from comments if available
 */
export function extractPostIdFromComments(comments: FacebookComment[]): string {
    for (const comment of comments) {
        if (comment.postId) {
            return comment.postId;
        }
    }
    return '';
}