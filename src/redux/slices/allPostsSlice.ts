import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export const fetchAllPosts = createAsyncThunk("/api/posts", async () => {
  try {
    const response = await fetch("/api/posts");

    const data: Array<post> = await response.json();
    return data;
  } catch (error: any) {
    console.log("fetchAllPosts Error: ", error);
    return error;
  }
});

export const fetchInitialPosts = createAsyncThunk(
  "/api/initialposts",
  async () => {
    try {
      //CHANGE THIS TO FETCH FROM DB -- ONLY MOST RECENT 12 POSTS
      const response = await fetch("/api/posts");

      const data: Array<post> = await response.json();
      return data;
    } catch (error: any) {
      console.log("fetchInitialPosts Error: ", error);
      return error;
    }
  }
);

const initialState: allPostsState = {
  allPostsData: [],
  status: "idle",
  error: null,
};

export const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    setInitialPosts: (state: any, action: PayloadAction<object>) => {
      console.log(action.payload);
      state.allPostsData = action.payload;
    },
    addPost: (state: any, action: PayloadAction<object>) => {
      console.log(action.payload);
      state.allPostsData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    //ALL POSTS BUILDERS
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
    //INITIAL POSTS BUILDERS
    builder.addCase(
      fetchInitialPosts.fulfilled,
      (state: any, action: PayloadAction<Array<post>>) => {
        state.allPostsData = action.payload;
        state.status = "idle";
      }
    );
    builder.addCase(fetchInitialPosts.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchInitialPosts.rejected,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload.message;
        state.status = "idle";
      }
    );
  },
});

export const selectAllPosts = (state: RootState) => state.allPosts.allPostsData;
export const { setInitialPosts, addPost } = allPostsSlice.actions;

export default allPostsSlice.reducer;
