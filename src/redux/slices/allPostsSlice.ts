import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchInitialPosts = createAsyncThunk(
  "/api/posts/initialposts",
  async (numPosts: number) => {
    const response = await fetch(
      `http://localhost:3000/api/posts/initialposts/${numPosts}`
    );

    const data = await response.json();
    return data;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "/api/posts/search",
  async (searchString: string) => {
    const response = await fetch(`/api/posts/search/${searchString}`);

    const data = await response.json();
    return { data, searchString };
  }
);

export const fetchMoreSearchResults = createAsyncThunk(
  "/api/posts/search/request",
  async (searchData: SearchData) => {
    const searchString = searchData.searchString;
    const cursor = searchData.searchCursor;

    const response = await fetch(
      `/api/posts/search/request/${searchString}/${cursor}`
    );

    const data = await response.json();
    return { data };
  }
);

const initialState: allPostsState = {
  allPostsData: [],
  filteredPosts: [],
  searchData: {
    searchString: "",
    searchResults: [],
    searchCursor: null,
    statsFilter: false,
  },
  cursor: 0,
  status: "idle",
  error: null,
};

export const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    setInitialPosts: (state: any, action: PayloadAction<object>) => {
      state.allPostsData = action.payload;
    },
    changeFilter: (state: any, action: PayloadAction<object>) => {
      state.searchData.statsFilter = true;
      state.filteredPosts = action.payload;
    },
    addPost: (state: any, action: PayloadAction<object>) => {
      state.allPostsData.push(action.payload);
      state.filteredPosts.push(action.payload);
    },
    addUserCompliance: (state: any, action: PayloadAction<any>) => {
      // state.allPostsData[action.payload.index].userCompliances.push(
      //   action.payload.data
      // );
      state.filteredPosts[action.payload.index].userCompliances.push(
        action.payload.data
      );
    },
    updateCursor: (state: any, action: PayloadAction<number>) => {
      state.cursor = action.payload;
    },
    rehydrate: (state, action) => {
      state.allPostsData = action.payload.allPostsData;
      state.cursor = action.payload.cursor;
      state.filteredPosts = action.payload.allPostsData;
    },
    clearSearchData: (state: any) => {
      state.filteredPosts = state.allPostsData;
      state.searchData = {
        searchString: "",
        searchResults: [],
        searchCursor: null,
        statsFilter: false,
      };
    },
  },
  extraReducers: (builder) => {
    //INITIAL POSTS BUILDERS
    builder.addCase(
      fetchInitialPosts.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.allPostsData = action.payload.firstPosts;
        state.cursor = action.payload.myCursor;
        state.filteredPosts = action.payload.firstPosts;
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
    //SEARCH RESULTS BUILDERS
    builder.addCase(
      fetchSearchResults.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.searchData.searchResults = action.payload.data.searchResults;
        state.searchData.searchString = action.payload.searchString;
        state.searchData.searchCursor = action.payload.data.myCursor;
        state.searchData.statsFilter = false;
        state.filteredPosts = action.payload.data.searchResults;
        state.status = "idle";
      }
    );
    builder.addCase(fetchSearchResults.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchSearchResults.rejected,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload.message;
        state.status = "idle";
      }
    );

    //MORE SEARCH RESULTS BUILDERS INFINITE SCROLL
    builder.addCase(
      fetchMoreSearchResults.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.searchData.searchResults = action.payload.data.searchResults;
        state.searchData.searchCursor = action.payload.data.newCursor;
        state.filteredPosts = [
          ...state.filteredPosts,
          ...action.payload.data.searchResults,
        ];
        state.status = "idle";
      }
    );
    builder.addCase(fetchMoreSearchResults.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchMoreSearchResults.rejected,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload) state.error = action.payload.message;
        state.status = "idle";
      }
    );
  },
});

export const selectAllPosts = (state: RootState) => state.allPosts.allPostsData;
export const selectCursor = (state: RootState) => state.allPosts.cursor;
export const selectFilteredPosts = (state: RootState) =>
  state.allPosts.filteredPosts;
export const selectSearchData = (state: RootState) => state.allPosts.searchData;
export const selectStatus = (state: RootState) => state.allPosts.status;
export const {
  setInitialPosts,
  addPost,
  updateCursor,
  rehydrate,
  clearSearchData,
  addUserCompliance,
  changeFilter,
} = allPostsSlice.actions;

export default allPostsSlice.reducer;
