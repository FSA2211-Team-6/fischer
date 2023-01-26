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
  green: number;
  yellow: number;
  red: number;
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

export const fetchSinglePost = createAsyncThunk(
  "allPosts/fetchById",
  async (postID: number) => {
    try {
      const response = await fetch(`/api/posts/${postID}`);
      const data: object = await response.json();
      return data;
    } catch (err: any) {
      console.error(err);
    }
  }
);

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const singlePostState = (state: any) => {
  return state.singlePost;
};
export default singlePostSlice.reducer;
