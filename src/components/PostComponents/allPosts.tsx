import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addPost,
  updateCursor,
  selectCursor,
  selectFilteredPosts,
  selectSearchData,
  fetchMoreSearchResults,
  addUserCompliance,
} from "@/redux/slices/allPostsSlice";
import Loading from "./loading";
import { useSession } from "next-auth/react";
import { getPostStats } from "@/library/post/postHelpers";
import Image from "next/image";
import Link from "next/link";

interface Props {
  firstPosts: Post[];
}
//THE ALL POSTS COMPONENT
const AllPosts: React.FC<Partial<Props>> = ({ firstPosts }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  //local state
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<number | null>(null);
  const [userCompliance, setUserCompliance] = React.useState<
    Array<UserCompliance>
  >([]);
  const [votemAnimation, setVoteAnimation] = React.useState<boolean>(false);
  const [postClicked, setPostClicked] = React.useState<number | null>(null);
  const [filteredPosts, setFilteredPosts] = React.useState<any>(firstPosts);
  const [outOfPosts, setOutOfPosts] = React.useState<boolean>(false);

  //useSelectors
  const getFilteredPosts = useAppSelector(selectFilteredPosts);
  const getSearchData = useAppSelector(selectSearchData);
  const cursor = useAppSelector(selectCursor);

  //useEffects///////////////////////////////////////////////////////////////////

  //if a session exists, set the userId
  useEffect(() => {
    if (session) {
      setUserId(session.user.fischerId);
    }
  }, [session]);

  //get the users vote history so we can hide the vote button if they have already voted
  useEffect(() => {
    const fetchUserCompliance = async () => {
      const data = await fetch(`/api/usercompliance/${userId}`);
      const complianceData = await data.json();
      setUserCompliance(complianceData);
    };
    if (userId) {
      fetchUserCompliance();
    }
  }, [userId]);

  //put filtered posts in state to be rendered
  useEffect(() => {
    if (getFilteredPosts!.length > 0) {
      setFilteredPosts(getFilteredPosts);
    }

    if (getSearchData.statsFilter === true) {
      setOutOfPosts(true);
    } else setOutOfPosts(false);
  }, [getFilteredPosts, getSearchData]);

  //////////////////////////////////////////////////////////////////////////////

  //Infinite scroll Logic//////////////////////////////////////////////////////

  //handleRefresh requests more posts from the db
  const handleRefresh = async (cursor: number) => {
    const morePosts = await fetch(`/api/posts/request/${cursor}`);
    const data = await morePosts.json();
    if (data.posts.length === 0) {
      setOutOfPosts(true);
      setLoading(false);
    } else {
      data.posts.forEach((post: Post) => {
        dispatch(addPost(post));
      });
      dispatch(updateCursor(data.newCursor));
      setOutOfPosts(false);
      setLoading(false);
    }
  };

  //trottle function prevents a user from scrolling super fast and spamming get requests too quickly
  let throttleTimer: boolean | undefined;

  function throttle(callback: Function, time: number) {
    if (throttleTimer) {
      return;
    }
    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  }

  const observer = React.useRef<IntersectionObserver | null>(null);
  const endOfScrollRef = React.useCallback<any>(
    (node: HTMLElement) => {
      const handleSearchRefresh = () => {
        if (getSearchData.searchResults.length > 1) {
          dispatch(fetchMoreSearchResults(getSearchData));
        }
        setLoading(false);
      };

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (getSearchData.searchCursor) {
            if (getSearchData.searchResults.length > 1) {
              setLoading(true);
            }
            throttle(() => {
              handleSearchRefresh();
            }, 1000);
          } else if (!outOfPosts) {
            setLoading(true);
            throttle(() => {
              handleRefresh(cursor);
            }, 1000);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [cursor, dispatch, getSearchData, outOfPosts]
  );

  //////////////////////////////////////////////////////////////////////////////

  //Vote submission logic//////////////////////////////////////////////////////
  const submitVote = async (compliance: number, postId: number) => {
    const newCompliance = {
      fischerId: userId,
      postId: postId,
      compliance: compliance,
    };

    const response = await fetch("/api/usercompliance", {
      method: "POST",
      body: JSON.stringify(newCompliance),
    });
    const data = await response.json();

    const index = filteredPosts.findIndex((post: Post) => {
      return post.id === postId;
    });

    dispatch(addUserCompliance({ data, index }));

    setUserCompliance([
      ...userCompliance,
      ...[{ postId, fischerId: userId, compliance: compliance }],
    ]);
  };
  /////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {filteredPosts!.length > 0 &&
        filteredPosts!.map((post: Post, index: Number) => {
          return (
            <div
              key={post.id}
              className="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-1 relative w-full px-4 py-4 bg-white dark:bg-gray-700 shadow-slate-900 drop-shadow-2xl"
            >
              <div className="inline-flex items-center w-full">
                {/* Begin website indicator */}
                <div className="relative items-center gap-1 bg-white text-gray-700 text-sm w-max inline-flex font-semibold pl-4 pr-4 pt-2 pb-2 mr-8 rounded-full rounded-tl-none hover:bg-slate-800 hover:text-white hover:cursor-pointer">
                  <span className="material-symbols-outlined">language</span>
                  {post.websiteArticle.website.hostSite.slice(
                    post.websiteArticle.website.hostSite.indexOf(".") + 1
                  )}
                  <a
                    className="absolute w-full h-full top-0 left-0 z-10"
                    href={post.websiteArticle.articleURL}
                  ></a>
                </div>

                {/* End website indicator */}

                {/* Begin post categories */}
                <div className="inline-flex gap-2">
                  <div className=" bg-gray-800 text-emerald-500 font-semibold font-sans tracking-wide text-xs w-max inline rounded-full pl-3.5 pr-3.5 pt-1.5 pb-1.5">
                    {post.topicName}
                  </div>
                </div>
                {/* End post categories */}

                {/* Post User Name */}
                <div className="ml-auto">
                  {post.user ? (
                    <div className="flex items-center gap-2">
                      <p className="text-xs">{post.user.name}</p>
                      <Image
                        className="rounded-full"
                        src={post.user.image as string}
                        alt="User profile picture"
                        width={40}
                        height={40}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-xs">Deleted user</p>
                      <Image
                        className="rounded-full"
                        src="/images/user.jpeg"
                        alt="User profile picture"
                        width={40}
                        height={40}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Main Section of Card */}
              <div className="flex items-end space-x-2">
                <section className="flex flex-col gap-y-5 w-full">
                  {/* Assertion */}
                  <div className="border-l-2 border-orange-500 p-4 shadow-md shadow-gray-800">
                    <div className="flex h-max mb-4">
                      <p className="font-bold text-lg w-max pl-2 pr-2.5">
                        Assertion
                      </p>
                      {/* start voting buttons */}
                      {userId ? (
                        <div>
                          {userCompliance.find((x) => x.postId === post.id) ? (
                            <div className="flex items-center">
                              <div className="group relative flex items-center">
                                <span className="material-symbols-outlined hover:cursor-pointer">
                                  beenhere
                                </span>
                                <span
                                  className="group-hover:opacity-100  transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                                >
                                  You&#39;ve already voted.
                                </span>
                              </div>
                              <span
                                className={`${
                                  votemAnimation && post.id === postClicked
                                    ? "animate-fade"
                                    : "opacity-0"
                                } opacity-0 text-xs ml-2`}
                                onAnimationEnd={() => setVoteAnimation(false)}
                              >
                                Thank you for voting. Your feedback matters.
                              </span>
                            </div>
                          ) : (
                            <div className="flex justify-beginning gap-1 items-center">
                              <button
                                onClick={() => {
                                  submitVote(1, post.id);
                                  setVoteAnimation(true);
                                  setPostClicked(post.id);
                                }}
                                className="flex group justify-center items-center relative"
                              >
                                <span
                                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                                >
                                  Assertion is true
                                </span>
                                <span className="material-symbols-outlined text-emerald-600 hover:text-emerald-400">
                                  verified_user
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  submitVote(0, post.id);
                                  setVoteAnimation(true);
                                  setPostClicked(post.id);
                                }}
                                className="flex group justify-center items-center relative"
                              >
                                <span
                                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                                >
                                  Assertion is Subjective
                                </span>
                                <span className="material-symbols-outlined text-amber-400 hover:text-amber-300">
                                  gpp_maybe
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  submitVote(-1, post.id);
                                  setVoteAnimation(true);
                                  setPostClicked(post.id);
                                }}
                                className="flex group justify-center items-center relative"
                              >
                                <span
                                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                                >
                                  Assertion is False
                                </span>
                                <span className="material-symbols-outlined text-red-400 hover:text-red-300">
                                  gpp_bad
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null}
                      {/* end voting buttons */}
                    </div>
                    <div className="w-full h-1/12 p-2 text-gray-700 dark:text-white text-sm font-sans relative flex items-center gap-4">
                      {/* <span className="text-4xl font-serif absolute -left-2 -top-2">
                        &#8220;
                      </span>
                      {post.assertion}
                      <span className="text-4xl font-serif absolute -bottom-5 pl-1.5">
                        &#8221;
                      </span> */}
                      <span className="material-symbols-outlined nohover material-icons md-36 text-orange-300">
                        format_quote
                      </span>
                      {post.assertion}
                    </div>
                  </div>
                  {/* AI Response */}
                  <div className="border-l-2 border-yellow-500 p-4 shadow-md shadow-gray-800">
                    <p className="mb-4 font-bold text-lg  w-max pl-2 pr-2">
                      AI Response
                    </p>
                    <div className="w-full relative h-1/12 text-gray-700 dark:text-white text-sm font-sans p-2 flex items-center gap-4">
                      {/* <span className="text-4xl font-serif absolute -left-2 -top-2">
                        &#8220;
                      </span>
                      {post.aiResponse}
                      <span className="text-4xl font-serif absolute -bottom-5 pl-1.5">
                        &#8221;
                      </span> */}
                      <span className="material-symbols-outlined nohover material-icons md-36 text-amber-200">
                        format_quote
                      </span>
                      {post.aiResponse}
                    </div>
                  </div>
                </section>
              </div>
              {/* Comment/Expert Repsonse + Stats Box */}
              <div className="flex gap-5 items-start">
                {/* Comments */}
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="group relative text-sm cursor-pointer flex pb-2 items-center gap-1 border-b border-transparent hover:border-white">
                      <span
                        className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                      >
                        Comments
                      </span>

                      {post.comments ? (
                        <Link
                          href={`/posts/${post.id}/2`}
                          className="flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined nohover material-icons">
                            chat
                          </span>
                          {post.comments.length}
                        </Link>
                      ) : (
                        <Link
                          href={`/posts/${post.id}/2`}
                          className="flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined nohover material-icons">
                            chat
                          </span>
                          0
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {/* Expert Resposnes */}
                <div className="flex items-center">
                  <div className="w-full">
                    <div className=" group relative text-sm cursor-pointer pb-2 flex  items-center gap-1 border-b border-transparent hover:border-white">
                      <span
                        className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                      >
                        Expert Responses
                      </span>
                      {/* <span className="material-symbols-outlined nohover material-icons">
                        3p
                      </span> */}
                      {post.expertResponses ? (
                        <Link
                          href={`/posts/${post.id}/1`}
                          className="flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined nohover material-icons">
                            3p
                          </span>
                          {post.expertResponses.length}
                        </Link>
                      ) : (
                        <Link
                          href={`/posts/${post.id}/1`}
                          className="flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined nohover material-icons">
                            3p
                          </span>
                          0
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {/* Begin Post Stats */}
                <div className="dark:text-white flex gap-4 ml-auto">
                  {/* <p>Truthiness</p> */}
                  <div
                    className={`flex group relative items-center gap-1.5 text-xs border-b pb-2 m-px cursor-default ${
                      getPostStats(post).truthColor
                    } hover:mb-0 hover:border-b-2`}
                  >
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                    >
                      Truthiness
                    </span>
                    <span className="material-symbols-outlined">
                      query_stats
                    </span>
                    <div className="">{getPostStats(post).truthiness}</div>
                  </div>
                  {/* Divisiveness */}
                  <div
                    className={`flex group relative items-center gap-1.5 text-xs border-b pb-2 m-px cursor-default ${
                      getPostStats(post).divisivenessColor
                    } hover:mb-0 hover:border-b-2`}
                  >
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                    >
                      Divisivness
                    </span>
                    <span className="material-symbols-outlined">
                      call_split
                    </span>
                    <div>{getPostStats(post).divisiveness}</div>
                  </div>
                  {/*Interest */}
                  <div className="flex group relative items-center gap-1.5 text-xs border-b border-blue-400 pb-2 mb-px cursor-default hover:mb-0 hover:border-b-2">
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs text-gray-100 rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                    >
                      Interest
                    </span>
                    <span className="material-symbols-outlined">bar_chart</span>
                    <div> {post.userCompliances.length}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div ref={endOfScrollRef}></div>
      {outOfPosts && !getSearchData.statsFilter ? (
        <div className="text-center">
          <p className="text-gray-500 font-sans text-xl tracking-wider mb-4">
            Sorry! There are no more assertions to show you, try again later...
          </p>
          <button
            onClick={() => {
              setLoading(true);
              throttle(() => {
                handleRefresh(cursor);
              }, 600);
            }}
            className="flex items-center m-auto gap-2 pr-2 pl-1 pt-2 pb-2 mb-6 h-10 text-gray-400 border border-gray-300 rounded-md text-md hover:bg-white hover:text-gray-700"
          >
            <span className="material-symbols-outlined material-icons md-36 ">
              refresh
            </span>
            Refresh
          </button>
        </div>
      ) : null}
      {loading ? <Loading /> : null}
    </div>
  );
};

export default AllPosts;
