import { fetchSinglePost } from "@/redux/slices/singlePostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { singlePostState } from "@/redux/slices/singlePostSlice";

export default function SinglePost({ post }) {
  return (
    <>
      <div>fact: {post.singlePostData.fact}</div>
      <div>greenCount: {post.singlePostData.greenCount}</div>
      <div>yellowCount: {post.singlePostData.yellowCount}</div>
      <div>redCount: {post.singlePostData.redCount}</div>
    </>
  );
}
