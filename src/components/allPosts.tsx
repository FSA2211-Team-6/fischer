import { selectAllPosts } from "@/redux/slices/allPostsSlice";
import { useAppSelector } from "@/redux/store";

export default function AllPosts() {
  const posts = useAppSelector(selectAllPosts);
  console.log(posts);

  const text =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.";
  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div
              key={post.postId}
              className="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-1 relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700"
            >
              <div>
                <div className="bg-purple-500 text-sm w-max inline-flex font-semibold pl-4 pr-4 pt-2 pb-2 mr-12 rounded-full rounded-tl-none hover:bg-purple-400">
                  <a href={post.articleURL}>
                    {post.host.slice(post.host.indexOf(".") + 1)}
                  </a>
                </div>

                {/* Begin post categories */}
                <div className="inline-flex gap-2 w-max">
                  <div className="bg-red-500 text-sm w-max inline font-semibold rounded-full pl-3 pr-3 pt-1 pb-1">
                    Politics
                  </div>
                  <div className="bg-emerald-700 text-sm w-max inline font-semibold rounded-full pl-3 pr-3 pt-1 pb-1">
                    Literature
                  </div>
                  <div className="bg-sky-700 text-sm w-max inline font-semibold rounded-full pl-3 pr-3 pt-1 pb-1">
                    Science
                  </div>
                </div>
                {/* End post categories */}

                <div className="inline-flex gap-2 float-right items-center">
                  <p className="inline float-right text-xs">
                    {post.user.userName}
                  </p>
                  <div className="mx-auto object-cover inline float-right rounded-full bg-white h-10 w-10 "></div>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <section className="flex flex-col gap-y-5">
                  <div className="border-l-2 border-orange-500 p-4">
                    <p className="font-bold text-lg mb-4 w-max pl-2 pr-2">
                      Assertion
                    </p>
                    <div className="h-1/12 p-2 text-gray-700 dark:text-white text-sm font-sans relative">
                      <div className="text-4xl font-serif absolute -top-3 -left-2">
                        <span>&#8220;</span>
                      </div>
                      {post.fact}
                      <div className="text-4xl font-serif absolute right-0 -bottom-5 pr-2">
                        <span className="">&#8221;</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-2 border-yellow-500 p-4">
                    <p className="mb-4 font-bold text-lg  w-max pl-2 pr-2">
                      AI Response
                    </p>
                    <div className="relative h-1/12 text-gray-700 dark:text-white text-sm font-sans p-2">
                      <div className="text-4xl font-serif absolute -top-3 -left-2">
                        <span>&#8220;</span>
                      </div>
                      {post.aiResponse}
                      <div className="text-4xl font-serif absolute right-0 -bottom-5 pr-2">
                        <span>&#8221;</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="text-sm hover:underline underline-offset-4 cursor-pointer">
                    {post.comments.length === 1
                      ? `${post.comments.length} comment`
                      : `${post.comments.length} comments`}
                  </div>
                </div>
                <div className="flex justify-end gap-4 align-middle w-full">
                  <button className="border flex justify-center border-green-700 rounded-full w-7 h-7 hover:bg-green-300 hover:text-gray-700">
                    +
                  </button>
                  <button className="border flex justify-center border-yellow-500 rounded-full w-7 h-7 hover:bg-yellow-300 hover:text-gray-700">
                    ?
                  </button>
                  <button className="border flex justify-center border-red-400 rounded-full w-7 h-7 hover:bg-red-400 hover:text-gray-700">
                    -
                  </button>
                </div>
              </div>
              {/* Begin Post Stats */}
              <div className="dark:text-white flex gap-2 justify-between mt-6">
                <div className="flex items-center space-x-3 text-sm">
                  <p>Truthiness</p>
                  <div className="flex items-end text-xs">
                    {post.truthVotes.green}
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
                    {post.truthVotes.yellow}
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
                    {post.truthVotes.red}
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
            </div>
          );
        })}
    </div>
  );
}
