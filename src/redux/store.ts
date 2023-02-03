import { configureStore } from "@reduxjs/toolkit";
import allPostsReducer from "./slices/allPostsSlice";
import singlePostReducer from "../redux/slices/singlePostSlice";
import commentsReducer from "../redux/slices/commentSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    allPosts: allPostsReducer,
    singlePost: singlePostReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
