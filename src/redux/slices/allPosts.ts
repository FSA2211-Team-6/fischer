import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

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

export interface allPostsState {
  allPostsData: Array<post>;
  status: "loading" | "idle";
  error: string | null;
}

const initialState: allPostsState = {
  allPostsData: [],
  status: "idle",
  error: null,
};

export const fetchAllPosts = createAsyncThunk("/api/posts", async () => {
  try {
    const response = await fetch("/api/posts");

    const data: post = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log("fetchAllPosts Error: ", error);
    return error;
  }
});

export const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPosts.fulfilled,
      (state: any, action: PayloadAction<post>) => {
        console.log(action.payload);
        state.allPostsData = action.payload;
        state.status = "idle";
      }
    );
    builder.addCase(fetchAllPosts.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchAllPosts.rejected,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload.message;
        state.status = "idle";
      }
    );
  },
});

export const selectAllPosts = (state: RootState) => state.allPosts;

export default allPostsSlice.reducer;
