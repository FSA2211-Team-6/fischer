import React from "react";
import { fetchSinglePost } from "@/redux/slices/singlePostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { singlePostState } from "@/redux/slices/singlePostSlice";
import { useEffect } from "react";
import SinglePost from "@/components/singlePost";
import Tabs from "@/components/singlePostTabs";
import CommentBox from "@/components/commentBox";

export default function SinglePostPage() {
  const router = useRouter();
  let postId = router.query["postId"] || "";
  const dispatch = useAppDispatch();

  const post: singlePostState = useAppSelector(singlePostState);
  useEffect(() => {
    const fetchData = async () => {
      postId ? await dispatch(fetchSinglePost(+postId)) : "";
    };
    fetchData();
  }, [dispatch, postId]);

  return (
    <>
      <main className="relative h-screen overflow-auto bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col justify-center px-14 pt-10 pb-4">
          {/* <div className="flex flex-col  w-full max-w-7xl h-18"></div> */}
          <div>
            <SinglePost post={post} />
          </div>
        </div>
        {/* tabs  */}
        <div className="flex flex-col mb-4 justify-center px-14">
          <div className="w-full bg-gray-700  ">
            <div>
              <CommentBox />
              <Tabs />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
