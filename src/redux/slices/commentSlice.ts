import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface comment {
  commentId: number;
  postId: number;
  fischerId: number;
  content: string;
  upvotes: number;
  createdAt: Date;
}

export interface commentState {
  singlePostData: comment;
  status: "loading" | "idle";
  error: string | null;
}

export const fetchCommentsFromPost = createAsyncThunk(
  "/api/posts/fetchByPostId",
  async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      const comments: Array<comment> = data.comments;
      return comments;
    } catch (err: any) {
      console.error("fetchCommentsFromPost err: ", err);
    }
  }
);
