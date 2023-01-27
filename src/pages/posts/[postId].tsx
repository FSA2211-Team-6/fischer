import React from "react";
import { fetchSinglePost } from "@/redux/slices/singlePostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { singlePostState } from "@/redux/slices/singlePostSlice";
import { useEffect } from "react";
import SinglePost from "@/components/singlePost";

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

  const AIAnswer: String =
    "AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI Answer AI";

  return (
    <>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col justify-center p-14">
          <div className="w-full  max-w-7xl bg-gray-700  ">
            <div className="flex flex-col  w-full max-w-7xl h-18">
              <div className="flex items-center justify-between w-full h-16">
                <div className="relative flex items-center p-1 space-x-4">
                  <div className="flex items-center p-2 bg-white rounded-full shadow h-10 w-10 m-4"></div>
                </div>

                <div className="relative flex items-center justify-end  p-1 space-x-4">
                  user
                  <div className="flex items-center p-2 bg-white rounded-full shadow h-10 w-10 m-4"></div>
                </div>
              </div>
            </div>
            <div>
              <SinglePost post={post} />
            </div>
            <div className="p-6">{`${AIAnswer}`}</div>
          </div>
        </div>

        <div className="flex flex-col mb-4 justify-center px-14">
          <div className="w-full max-w-7xl bg-gray-700  ">
            <div className="flex flex-col  w-full max-w-7xl h-18">
              <ul
                className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
                id="tabs-tabFill"
                role="tablist"
              >
                <li
                  className="nav-item flex-auto text-center"
                  role="presentation"
                >
                  <a
                    href="#tabs-expertFill"
                    className="nav-link
                    w-full
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-900
                    focus:border-transparent
                    active"
                    id="tabs-expert-tabFill"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-expertFill"
                    role="tab"
                    aria-controls="tabs-expertFill"
                    aria-selected="true"
                  >
                    Experts
                  </a>
                </li>
                <li
                  className="nav-item flex-auto text-center"
                  role="presentation"
                >
                  <a
                    href="#tabs-profileFill"
                    className="
                    nav-link
                    w-full
                    block
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    border-x-0 border-t-0 border-b-2 border-transparent
                    px-6
                    py-3
                    my-2
                    hover:border-transparent hover:bg-gray-900
                    focus:border-transparent"
                    id="tabs-comments-tabFill"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-commentsFill"
                    role="tab"
                    aria-controls="tabs-commentsFill"
                    aria-selected="false"
                  >
                    Comments
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="tabs-tabContentFill">
                <div
                  className="tab-pane fade show active"
                  id="tabs-commentsFill"
                  role="tabpanel"
                  aria-labelledby="tabs-comments-tabFill"
                >
                  Tab 1 content fill
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-commentsFill"
                  role="tabpanel"
                  aria-labelledby="tabs-comments-tabFill"
                >
                  Tab 2 content fill
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
