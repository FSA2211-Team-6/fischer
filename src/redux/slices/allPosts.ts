import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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

export interface allPostsState {
  postId: null | number;
  user: user;
  fact: String;
  articleURL: String;
  host: String;
  truthVotes: truthVotes;
  comments: Array<comment>;
}

const initialState: allPostsState = {
  postId: null,
  user: {
    userId: null,
    userName: "",
    firstName: "",
    lastName: "",
  },
  fact: "",
  articleURL: "",
  host: "",
  truthVotes: {
    green: 0,
    yellow: 0,
    red: 0,
  },
  comments: [],
};

export const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {},
});

export const selectAllPosts = (state: RootState) => state.allPosts;

export default allPostsSlice.reducer;
