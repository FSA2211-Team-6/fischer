import React, { useState } from "react";
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
  const [userId, setUserId] = React.useState<number | null>(null);
  const [currPostId, setCurPostId] = React.useState<number | null>(null);
  const [currTabSelection, setCurrTabSelection] = React.useState<number | null>(
    null
  );

  const [isExpert, setIsExpert] = useState(false);
  const [expertiseArray, setExpertiseArray] = React.useState<Array<object>>([]);
  const [isExpertResponse, setIsExpertResponse] = useState(false);
  const [currExpertId, setCurrExpertId] = React.useState<number | null>(null);

  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { params } = router.query;

      if (!params) return;
      const postId = params[0];
      const tabSelection = params[1];
      setCurrTabSelection(Number(tabSelection));
      setCurPostId(Number(postId));
    }
  }, [router, currPostId, currTabSelection]);

  const post: any = useAppSelector(singlePostState);

  useEffect(() => {
    const fetchData = () => {
      currPostId ? dispatch(fetchSinglePost(+currPostId)) : "";
    };
    fetchData();
  }, [dispatch, currPostId]);

  useEffect(() => {
    if (session) {
      setUserId(session.user.fischerId);
    }
  }, [session]);

  //get current user's expertise
  useEffect(() => {
    const fetchExpertiseFromUserId = async () => {
      const response = await fetch(`/api/experts/${userId}`);
      const data = await response.json();
      setExpertiseArray(data);
    };
    if (userId) {
      fetchExpertiseFromUserId();
    }
  }, [userId]);

  //check to see if user is an expert of the current post's topic
  //////V1
  // useEffect(() => {
  //   if (post) {
  //     const expertData: any = expertiseArray.find((ele: any) => {
  //       return ele.topicId === post.singlePostData.topicId;
  //     });
  //     if (expertData) {
  //       setIsExpert(true);
  //       setCurrExpertId(expertData.id);
  //     }
  //   }
  // }, [expertiseArray, isExpert, post]);

  ///////V2
  useEffect(() => {
    if (post) {
      const expertData: any = expertiseArray.find((ele: any) => {
        return ele.topicId === post.singlePostData.topicId;
      });
      if (expertData) {
        setIsExpert(true);
        setCurrExpertId(expertData.id);
      } else {
        setIsExpert(false);
        setCurrExpertId(null);
      }
    }
  }, [expertiseArray, post]);

  return (
    <>
      {currTabSelection ? (
        <main className="px-14 relative h-screen bg-gray-100 dark:bg-gray-800 overflow-visible">
          <div className="flex flex-col justify-center pt-10">
            <div>
              <SinglePost
                post={post}
                userId={userId}
                currExpertId={currExpertId}
              />
            </div>
          </div>

          {/* show commnetbox if user is signed in, else show them link to sign in  */}
          <div className="flex flex-col mb-4 justify-center ">
            <div className="w-full bg-gray-700 overflow-visible ">
              {/* Toggle only shows if u are an expert for the current post/topic */}
              {isExpert === true ? (
                <div className="inline-flex">
                  <label className=" inline-flex items-center cursor-pointer pt-4 px-4 ">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isExpertResponse}
                      onChange={() => setIsExpertResponse(!isExpertResponse)}
                    />
                    <span
                      className={`relative w-12 h-6  border border-gray-500 rounded-full ${
                        isExpertResponse
                          ? "shadow-md bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 bottom-0 h-6 w-6 bg-white rounded-full shadow-inner ${
                          isExpertResponse ? "transform translate-x-full" : ""
                        }`}
                      />
                    </span>
                  </label>
                  <div className="pt-4 text-sm text-gray-200">
                    {isExpertResponse ? (
                      <div
                        className={`transition-opacity ease-in opacity-100 duration-500 ${
                          isExpertResponse ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        You are now commenting as an Expert!
                      </div>
                    ) : (
                      <div
                        className={`transition-opacity ease-in opacity-50 duration-500 ${
                          isExpertResponse ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        Turn on to comment as an Expert
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              {userId ? (
                <div>
                  <CommentBox
                    post={post}
                    userId={userId}
                    isExpertResponse={isExpertResponse}
                    currExpertId={currExpertId}
                  />
                </div>
              ) : (
                <>
                  <section className="relative flex  justify-center  antialiased   min-w-screen">
                    <div className="container px-0 mx-auto sm:px-8 py-4">
                      <div className="flex-col w-full pt-4 mx-auto bg-gray-800 border-b-2 border-r-2 border-gray-900 sm:px-4 sm:py-2 md:px-4 sm:rounded-lg sm:shadow-sm ">
                        <div className="flex items-center justify-center py-2 text-sm">
                          Commenting is reserved for signed in users. Please
                          sign in to comment!
                        </div>
                        <div className="flex justify-center pt-1 pb-2">
                          <button
                            className="text-sm font-medium px-4 py-1 items-center text-white bg-green-900 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
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

              <div className="">
                <Tabs post={post} tabSelection={currTabSelection} />
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}
