/**
 * Type definitions for Facebook GraphQL API responses
 * These interfaces provide type safety when working with Facebook API responses
 */

// Base GraphQL response interfaces
export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: Record<string, any>;
  status?: number;
  node?: GraphQLNode;
  edges?: { node?: any }[];
  response?: Array<{ data?: any; errors?: GraphQLError[] }>;
}

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: Record<string, any>;
  code?: string;
}

// Facebook Comment interfaces
export interface FacebookComment {
  id: string;
  commentId: string;
  postId: string;
  commentText: string;
  commentAuthorName: string;
  commentAuthorId: string;
  commentAuthorUrl?: string;
  timestamp?: string;
  commentUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  attachedImages?: string[];
  attachedVideos?: string[];
  postLinks?: string[];
}

export interface CommentData {
  body: {
    text: string;
  };
  id: string;
  author: {
    name: string;
    id: string;
    url?: string;
  };
  comment_action_links?: CommentActionLink[];
  created_time?: number;
  url?: string;
}

export interface CommentActionLink {
  __typename: string;
  comment?: {
    created_time: number;
    url: string;
  };
}

export interface RawCommentData {
  comment: CommentData;
}

// Facebook Post interfaces
export interface FacebookPost {
  id?: string;
  postId: string;
  postText: string;
  postAuthor: string;
  postAuthorId: string;
  postAuthorUrl?: string;
  postUrl?: string;  // Direct URL to the post
  postDate?: string; // ISO date string from creation_time
  postImages?: string[];
  postVideos?: string[];
  postLinks?: string[];
  email?: string;
  firstName?: string;
  lastName?: string;
  attachments?: any[];  // Changed from FacebookAttachment[] to any[] for more flexibility
  childPosts?: FacebookPost[];  // For shared posts/attached stories
  postComments?: FacebookComment[];
  commentCount?: number; // Count of comments on the post
  hasSharedContent?: boolean; // Flag indicating if this post shares another post
}

export interface FacebookAttachment {
  __typename?: string;
  type?: string;
  id?: string;
  url?: string;
  title?: string;
  description?: string;
  media?: {
    image?: {
      height: number;
      width: number;
      src: string;
    };
    source?: string;
  };
  image?: {
    uri: string;
    height: number;
    width: number;
  };
  viewer_image?: {
    uri: string;
    height: number;
    width: number;
  };
  subattachments?: {
    data: FacebookAttachment[];
  };
  all_subattachments?: {
    count: number;
    nodes: {
      deduplication_key: string;
      media: any;
      url: string;
    }[];
  };
  target?: {
    id: string;
    url: string;
  };
}

// GraphQL Node structure
export interface CometSections {
  content?: {
    story?: {
      comet_sections?: {
        message_container?: {
          story?: {
            message?: {
              text: string;
            };
          };
        };
        context_layout?: {
          story?: {
            comet_sections?: {
              actor_photo?: {
                story?: {
                  actors?: {
                    id: string;
                    name: string;
                    url?: string;
                  }[];
                };
              };
            };
          };
        };
        message?: {
          story?: {
            message?: {
              text: string;
            };
          };
        };
        metadata?: any[]; // Added missing metadata property
      };
      message?: {
        text: string;
      };
      creation_time?: number;
      created_time?: number; // Added missing timestamp property
      timestamp?: number; // Added missing timestamp property
      publish_time?: number; // Added missing timestamp property
      attachments?: any[];  // Changed to any[] for more flexibility
    };
  };
  feedback?: {
    story?: {
      post_id: string;
      feedback_context?: {
        interesting_top_level_comments?: RawCommentData[];
      };
    };
  };
}

export interface GraphQLNode {
  comet_sections?: CometSections;
  creation_time?: number; // Unix timestamp
  created_time?: number; // Alternative timestamp format
  publish_time?: number; // Another timestamp format Facebook might use
  timestamp?: number; // Additional timestamp property
  updated_time?: number; // Additional timestamp property
  story?: any; // Added to support additional story properties
  group_feed?: {
    edges: {
      node: {
        comet_sections?: CometSections;
        attached_story?: {
          comet_sections?: CometSections;
          message?: {
            text: string;
          };
          post_id?: string;
          story_owner?: {
            id: string;
            name: string;
            url?: string;
          };
          creation_time?: number; // Timestamp for attached story
        };
        post_id?: string;
        story_owner?: {
          id: string;
          name: string;
          url?: string;
        };
      };
    }[];
  };
  post_id?: string;
  message?: {
    text: string;
  };
  attached_story?: GraphQLNode; // Change to recursive type to handle nested stories
  story_card?: {
    post_id?: string;
    message?: {
      text: string;
    };
    story_owner?: {
      id: string;
      name: string;
      url?: string;
    };
    creation_time?: number; // Timestamp in story card
  };
  story_owner?: {
    id: string;
    name: string;
    url?: string;
  };
  author?: {
    id: string;
    name: string;
    url?: string;
  };
  actors?: {
    id: string;
    name: string;
    url?: string;
  }[];
  attachments?: any[]; // For direct attachment access
  feedback?: {
    comments?: {
      count: number; // Comment count
    };
    story?: {
      post_id: string;
      feedback_context?: {
        interesting_top_level_comments?: {
          comment: any;
        }[];
      };
    };
  };
}

// Request/Response interfaces for interception
export interface InterceptedRequest {
  url: string;
  method: string;
  body?: any;
  headers?: Record<string, string>;
}

export interface InterceptedResponse {
  status?: number;
  headers?: Record<string, string>;
  body: any;
  url: string;
}

export interface GraphQLInterceptionData {
  request: InterceptedRequest;
  response: InterceptedResponse | string | any;
  timestamp?: number;
}

// Pagination interfaces
export interface PagingInfo {
  cursors?: {
    before: string;
    after: string;
  };
  next?: string;
  previous?: string;
  has_next_page?: boolean;
  end_cursor?: string;
}

// Query interfaces
export interface GroupFeedQuery {
  id: string;
  first: number;
  after?: string;
  variables?: Record<string, any>;
}

export interface PostCommentsQuery {
  postId: string;
  first: number;
  after?: string;
  orderBy?: 'toplevel' | 'recent_activity' | 'chronological';
}

// Processing results
export interface ProcessedPostData {
  post: FacebookPost;
  topLevelComments: FacebookComment[];
  metadata?: {
    extractedAt: number;
    processingTime?: number;
  };
}