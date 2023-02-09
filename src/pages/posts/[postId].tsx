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
import { signIn } from "next-auth/react";

export default function SinglePostPage() {
  const [user, setUser] = React.useState<object | null>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  let postId = router.query["postId"] || "";

  const post: singlePostState = useAppSelector(singlePostState);
  useEffect(() => {
    const fetchData = () => {
      postId ? dispatch(fetchSinglePost(+postId)) : "";
    };
    fetchData();
  }, [dispatch, postId]);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);
  console.log("current user: ", user);
  return (
    <>
      <main className="relative h-screen overflow-auto bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col justify-center px-14 pt-10 pb-4">
          <div>
            <SinglePost post={post} />
          </div>
        </div>
        {/* tabs  */}
        <div className="flex flex-col mb-4 justify-center px-14">
          <div className="w-full bg-gray-700  ">
            {user ? (
              <div>
                <CommentBox post={post} user={user} />
              </div>
            ) : (
              <>
                <section className="relative flex  justify-center  antialiased   min-w-screen">
                  <div className="container px-0 mx-auto sm:px-8 py-4">
                    <div className="flex-col w-full pt-4 mx-auto bg-gray-800 border-b-2 border-r-2 border-gray-900 sm:px-4 sm:py-2 md:px-4 sm:rounded-lg sm:shadow-sm ">
                      <div className="flex items-center justify-center py-2 text-xs">
                        Commenting is reserved for signed in users. Please sign
                        in to comment!
                      </div>
                      <div className="flex justify-center pt-1 pb-2">
                        <button
                          className="text-sm font-medium px-4 items-center text-white bg-green-900 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                          onClick={() => signIn()}
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            <div>
              <Tabs post={post} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
