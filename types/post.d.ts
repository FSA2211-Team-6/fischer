declare global {
  interface comment {
    commentId: number;
    userId: number;
    postId: number;
    comment: String;
    upvotes: number;
  }
  interface user {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    fischerId: number;
    image: string;
    isAdmin: Boolean;
    currentTokens: number;
    maxTokens: number;
    expertise: any[];
  }
  interface truthVotes {
    green: number;
    yellow: number;
    red: number;
  }
  interface post {
    postId: null | number;
    user: user;
    fact: String;
    aiResponse: string;
    articleURL: string;
    host: string;
    truthVotes: truthVotes;
    comments: Array<comment>;
  }

  interface website {
    id: number;
    hostSite: string;
  }

  interface websiteArticle {
    articleURL: string;
    id: number;
    website: website;
    websiteId: number;
  }

  interface firstPostUser {
    createdAt: string;
    email: string;
    emailVerified: boolean | null;
    fischerId: number;
    id: number;
    image: string | null;
    name: string;
  }

  interface firstPosts {
    aiCompliance: number;
    aiResponse: string;
    assertion: string;
    createdAt: string;
    fischerId: number;
    id: number;
    publicCompliance: number;
    topicId: number;
    topicName: string;
    user: firstPostUser;
    websiteArticle: websiteArticle;
    websiteArticleId: number;
    comments: Array<comment>;
    expertResponses: Array<>;
    expertCompliance: number | null;
    publicCompliance: number | null;
    truthiness: number | null;
    userCompliances: Array<>;
  }
  interface allPostsState {
    allPostsData: Array<firstPosts>;
    cursor: number;
    status: "loading" | "idle";
    error: string | null;
  }
}

export {};
