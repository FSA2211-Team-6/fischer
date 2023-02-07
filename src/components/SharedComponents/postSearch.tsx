import { useAppDispatch } from "@/redux/store";
import {
  clearSearchData,
  fetchSearchResults,
} from "@/redux/slices/allPostsSlice";
import { useState } from "react";

export default function ListHeader() {
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchString === "") {
      dispatch(clearSearchData());
    } else {
      dispatch(fetchSearchResults(searchString));
    }
  };

  const handleClear = () => {
    dispatch(clearSearchData());
    setSearchString("");

    const searchBar = document.getElementById("post-search");
    searchBar.value = "";
  };

  return (
    <>
      <div className="pb-2 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4"></div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <form
                className="lg:pr-3 flex gap-4 items-center"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <label className="sr-only">Search</label>
                <div className="relative lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="post"
                    id="post-search"
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="search"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center px-4 h-10 text-gray-400 border border-gray-300 rounded-md text-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <button
            onClick={() => {
              handleClear();
            }}
            className="text-xs ml-1 text-gray-400 hover:underline hover:underline-offset-4"
          >
            clear results
          </button>
        </div>
      </div>
    </>
  );
}
