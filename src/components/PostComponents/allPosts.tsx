import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addPost,
  selectAllPosts,
  updateCursor,
  selectCursor,
} from "@/redux/slices/allPostsSlice";
import Loading from "./loading";

interface Props {
  firstPosts: firstPosts[];
}

interface Scroll {
  infiniteScroll: boolean;
}
//THE ALL POSTS COMPONENT
const AllPosts: React.FC<Partial<Props> & Partial<Scroll>> = ({
  firstPosts,
  infiniteScroll,
}) => {
  const dispatch = useAppDispatch();

  //gets the cursor from redux so we know what posts to fetch on infinite scroll
  const cursor = useAppSelector(selectCursor);

  //we use this to know where to put the empty div that will trigger the endless scroll
  const [infiniteScrollState, setInfiniteScrollState] = React.useState<
    boolean | undefined
  >(infiniteScroll);
  const [loading, setLoading] = React.useState<boolean>(false);

  //trottle function prevents a user from scrolling super fast and spamming get requests too quickly
  let throttleTimer: boolean;

  function throttle(callback: Function, time: number) {
    if (throttleTimer) {
      console.log("throttling");
      return;
    }
    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  }

  //observer and endOfScrollRef are what triggers the infinite scroll request
  const observer = React.useRef<IntersectionObserver | null>(null);
  const endOfScrollRef = React.useCallback<any>(
    (node: HTMLElement) => {
      //handleRefresh requests more posts from the db
      const handleRefresh = async (cursor: number) => {
        const morePosts = await fetch(`/api/posts/request/${cursor}`);
        const data = await morePosts.json();

        data.posts.forEach((post: firstPosts) => {
          dispatch(addPost(post));
        });
        //setting the new cursor
        dispatch(updateCursor(data.newCursor));
        setLoading(false);
      };

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        setLoading(true);

        if (entries[0].isIntersecting) {
          throttle(() => {
            handleRefresh(cursor);
          }, 600);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, cursor, dispatch]
  );

  //we use this only to check if it exists, if it doesnt exist I know the infinite scroll div needs
  //to be at the end of the initial post version of <AllPosts>.  If it is > 0, it needs to be in the
  //infinite scroll version of <AllPosts>.
  const posts = useAppSelector(selectAllPosts);

  return (
    <div>
      {firstPosts!.length > 0 &&
        firstPosts!.map((post, index) => {
          return (
            <div
              key={post.id}
              className="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-1 relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700"
            >
              <div>
                {/* Begin website indicator */}
                <div className="bg-purple-500 text-sm w-max inline-flex font-semibold pl-4 pr-4 pt-2 pb-2 mr-12 rounded-full rounded-tl-none hover:bg-purple-400">
                  <a href={post.websiteArticle.articleURL}>
                    {post.websiteArticle.website.hostSite.slice(
                      post.websiteArticle.website.hostSite.indexOf(".") + 1
                    )}
                  </a>
                </div>
                {/* End website indicator */}

                {/* Begin post categories */}
                <div className="inline-flex gap-2 w-max">
                  <div className="bg-red-500 text-sm w-max inline font-semibold rounded-full pl-3 pr-3 pt-1 pb-1">
                    {post.topicName}
                  </div>
                </div>
                {/* End post categories */}

                {/* Post User Name */}
                <div className="inline-flex gap-2 float-right items-center">
                  <p className="inline float-right text-xs">{post.user.name}</p>
                  <div className="mx-auto object-cover inline float-right rounded-full bg-white h-10 w-10 "></div>
                </div>
              </div>
              {/* Main Section of Card */}
              <div className="flex items-end space-x-2">
                <section className="flex flex-col gap-y-5">
                  {/* Assertion */}

                  <div className="border-l-2 border-orange-500 p-4 relative group">
                    <p className="font-bold text-lg mb-4 w-max pl-2 pr-2">
                      Assertion
                    </p>
                    <div className="w-full h-1/12 p-2 text-gray-700 dark:text-white text-sm font-sans relative">
                      <span className="text-4xl font-serif absolute -left-2 -top-2">
                        &#8220;
                      </span>
                      {post.assertion}
                      <span className="text-4xl font-serif absolute -bottom-5 pl-1.5">
                        &#8221;
                      </span>
                    </div>
                    <div className="flex items-center w-full h-full absolute top-0 right-0 rounded-r-md invisible group-hover:visible cursor-pointer">
                      <div className="flex justify-center gap-4 align-middle w-full opacity-100 p-12">
                        <button className="flex justify-center items-center bg-emerald-600  rounded-full w-full h-12 hover:bg-emerald-500">
                          True
                        </button>
                        <button className="flex justify-center items-center bg-amber-400  rounded-full w-full h-12 hover:bg-amber-300">
                          Subjective
                        </button>
                        <button className="flex justify-center items-center bg-red-500  rounded-full w-full h-12 hover:bg-red-400">
                          False
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* AI Response */}
                  <div className="border-l-2 border-yellow-500 p-4">
                    <p className="mb-4 font-bold text-lg  w-max pl-2 pr-2">
                      AI Response
                    </p>
                    <div className="w-full relative h-1/12 text-gray-700 dark:text-white text-sm font-sans p-2">
                      <span className="text-4xl font-serif absolute -left-2 -top-2">
                        &#8220;
                      </span>
                      {post.aiResponse}
                      <span className="text-4xl font-serif absolute -bottom-5 pl-1.5">
                        &#8221;
                      </span>
                    </div>
                  </div>
                </section>
              </div>
              {/* Comments */}
              <div className="flex items-center">
                <div className="w-full">
                  <div className="text-sm hover:underline underline-offset-4 cursor-pointer">
                    {post.comments
                      ? post.comments.length === 1
                        ? `${post.comments.length} comment`
                        : `${post.comments} comments`
                      : `0 comments`}
                  </div>
                </div>
              </div>
              {/* Begin Post Stats */}
              <div className="dark:text-white flex gap-2 justify-between mt-6">
                <div className="flex items-center space-x-3 text-sm">
                  <p>Truthiness</p>
                  <div className="flex items-end text-xs">
                    {/* {post.truthVotes.green} */}
                    <span className="flex items-center">
                      <svg
                        width="20"
                        fill="currentColor"
                        height="20"
                        className="h-3 text-red-500 transform rotate-180"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
                      </svg>
                      12%
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <p>Interest</p>
                  <div className="flex items-end text-xs">
                    {/* {post.truthVotes.yellow} */}
                    <span className="flex items-center">
                      <svg
                        width="20"
                        fill="currentColor"
                        height="20"
                        className="h-3 text-green-500"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
                      </svg>
                      10%
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <p>Divisiveness</p>
                  <div className="flex items-end text-xs">
                    {/* {post.truthVotes.red} */}
                    <span className="flex items-center">
                      <svg
                        width="20"
                        fill="currentColor"
                        height="20"
                        className="h-3 text-red-500 transform rotate-180"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
                      </svg>
                      4%
                    </span>
                  </div>
                </div>
              </div>
              {/* This is the blank div element at end of current posts, 
              reaching this element will attempt to fetch more posts */}
              {(firstPosts!.length === index + 1 &&
                posts.length === 0 &&
                infiniteScrollState === false) ||
              (firstPosts!.length === index + 1 &&
                posts.length > 0 &&
                infiniteScrollState === true) ? (
                <div ref={endOfScrollRef}></div>
              ) : null}
            </div>
          );
        })}
      {loading ? <Loading /> : null}
    </div>
  );
};

export default AllPosts;