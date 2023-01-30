import { fetchSinglePost } from "@/redux/slices/singlePostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { singlePostState } from "@/redux/slices/singlePostSlice";

export default function SinglePost({ post }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-1 relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
        <div>
          <div className="bg-purple-500 text-sm w-max inline-flex font-semibold pl-4 pr-4 pt-2 pb-2 mr-12 rounded-full rounded-tl-none hover:bg-purple-400">
            <a href="http://www.cnn.com">cnn.com</a>
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
            <p className="inline float-right text-xs">user</p>
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
                {post.singlePostData.fact}
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
                {`${post.singlePostData.fact}`}
                <div className="text-4xl font-serif absolute right-0 -bottom-5 pr-2">
                  <span>&#8221;</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="flex items-center">
          <div className="w-full"></div>
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
      </div>
    </>
  );
}
