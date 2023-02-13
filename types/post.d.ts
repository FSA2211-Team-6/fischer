declare global {
  interface comment {
    id: number;
    fischerId: number;
    postId: number;
    content: string;
    upvotes: number;
    createdAt: string;
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

  interface User {
    createdAt: string;
    email: string;
    emailVerified: boolean | null;
    fischerId: number;
    id: string;
    image: string | null;
    name: string;
    isAdmin: boolean;
    currentTokens: number;
    maxTokens: number;
  }
  interface UserCompliance {
    compliance: number;
    fischerId: number | null;
    postId: number;
  }
  interface ExpertCompliance {
    compliance: number;
    expertId: number | null;
    postId: number;
  }

  interface ExpertResponse {
    id: number;
    postId: number;
    expertId: number;
    content: string;
    compliance: number;
    createdAt: string;
    upvotes: number;
  }

  interface SearchData {
    searchCursor: number | null;
    searchResults: Array<Post>;
    searchString: string;
    statsFilter: boolean;
  }

  interface Post {
    aiCompliance: number;
    aiResponse: string;
    assertion: string;
    createdAt: string;
    fischerId: number | null;
    id: number;
    publicCompliance: number;
    topicId: number;
    topicName: string;
    user: User;
    userCompliances: Array<UserCompliance | null>;
    websiteArticle: websiteArticle;
    websiteArticleId: number;
    comments: Array<comment>;
    expertResponses: Array<ExpertResponse>;
    expertCompliances: Array<ExpertCompliance | null>;
  }

  interface allPostsState {
    allPostsData: Array<Post>;
    filteredPosts: Array<Post>;
    searchData: SearchData;
    cursor: number;
    status: "loading" | "idle";
    error: string | null;
  }

  interface Topic {
    name: string;
    posts: any[];
    id: number;
  }
}

export {};
