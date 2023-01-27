declare global {
  interface comment {
    commentId: number;
    userId: number;
    postId: number;
    comment: String;
    upvotes: number;
  }
  interface user {
    userId: null | number;
    userName: String;
    firstName: String;
    lastName: String;
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
  interface allPostsState {
    allPostsData: Array<post>;
    status: "loading" | "idle";
    error: string | null;
  }
}

export {};
