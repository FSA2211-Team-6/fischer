import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface comment {
  postId: number;
  fischerId: number;
  content: string;
  upvotes: number;
  createdAt: Date;
}

export interface commentState {
  commentData: Array<comment>;
  status: "loading" | "idle";
  error: string | null;
}

const initialState: commentState = {
  commentData: [],
  status: "idle",
  error: null,
};

export const fetchCommentsFromPost = createAsyncThunk(
  "/api/posts/fetchByPostId",
  async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      const comments: Array<comment> = data.comments;
      console.log("data from fetchThunk: ", data);
      return comments;
    } catch (err: any) {
      console.error("fetchCommentsFromPost err: ", err);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state: any, action: PayloadAction<object>) => {
      state.commentData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCommentsFromPost.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.commentData = action.payload;
        state.status = "idle";
      }
    );
    builder.addCase(fetchCommentsFromPost.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchCommentsFromPost.rejected,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload.message;
        state.status = "idle";
      }
    );
  },
});

export const commentsState = (state: RootState) => {
  return state.comments.commentData;
};
export const addComment = commentsSlice.actions;

export default commentsSlice.reducer;
