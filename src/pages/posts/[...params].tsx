import React from "react";
import { fetchSinglePost } from "@/redux/slices/singlePostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { singlePostState } from "@/redux/slices/singlePostSlice";
import { useEffect } from "react";
import CommentBox from "@/components/PostComponents/commentBox";
import SinglePost from "@/components/PostComponents/singlePost";
import Tabs from "@/components/PostComponents/singlePostTabs";
import { useSession } from "next-auth/react";

export default function SinglePostPage() {
  const [user, setUser] = React.useState<object | null>(null);
  const [currPostId, setCurPostId] = React.useState<number | null>(null);
  const [currTabSelection, setCurrTabSelection] = React.useState<number | null>(
    null
  );

  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { params } = router.query;

      if (!params) return null;
      const postId = params[0];
      const tabSelection = params[1];
      setCurrTabSelection(Number(tabSelection));
      setCurPostId(Number(postId));
    }
  }, [router, currPostId, currTabSelection]);

  const post: singlePostState = useAppSelector(singlePostState);
  useEffect(() => {
    const fetchData = () => {
      currPostId ? dispatch(fetchSinglePost(+currPostId)) : "";
    };
    fetchData();
  }, [dispatch, currPostId]);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

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
              <CommentBox post={post} user={user} />
              <Tabs post={post} tabSelection={currTabSelection} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
