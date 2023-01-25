import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type {RootState} from "../store";

export const fetchSinglePost = createAsyncThunk(
  "allPosts/fetchById",
  async (postID: number) => {
    try {
      const response = await fetch(`PLACEHOLDER/allPosts/${postID}`);
      const data: object = await response.json();
      return data;
    } catch (err) {
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
