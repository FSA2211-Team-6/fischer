import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface comment {
  commentId: number;
  userId: number;
  postId: number;
  comment: Text;
  upvotes: number;
}

export interface user {
  userId: null | number;
  userName: String;
  firstName: String;
  lastName: String;
}

export interface truthVotes {
  greenCount: number;
  yellowCount: number;
  redCount: number;
}

export interface post {
  postId: null | number;
  user: user;
  fact: String;
  articleURL: String;
  host: String;
  truthVotes: truthVotes;
  comments: Array<comment>;
}

export interface singlePostState {
  singlePostData: post;
  status: "loading" | "idle";
  error: string | null;
}

const initialState: singlePostState = {
  singlePostData: {
    postId: null,
    user: { userId: null, userName: "", firstName: "", lastName: "" },
    fact: "",
    articleURL: "",
    host: "",
    truthVotes: { greenCount: 0, yellowCount: 0, redCount: 0 },
    comments: [],
  },
  status: "idle",
  error: null,
};

export const fetchSinglePost = createAsyncThunk(
  "/api/posts/fetchByPostId",
  async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data: object = await response.json();
      return data;
    } catch (err: any) {
      console.error("fetchSinglePost err: ", err);
    }
  }
);

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSinglePost.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.singlePostData = action.payload;
        state.status = "idle";
      }
    );
    builder.addCase(fetchSinglePost.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchSinglePost.rejected,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload.message;
        state.status = "idle";
      }
    );
  },
});

export const singlePostState = (state: RootState) => {
  return state.singlePost;
};
export default singlePostSlice.reducer;
