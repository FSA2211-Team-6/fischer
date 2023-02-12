import { useAppDispatch } from "@/redux/store";
import {
  clearSearchData,
  fetchSearchResults,
} from "@/redux/slices/allPostsSlice";
import { useState } from "react";

export default function ListHeader() {
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const searchBar = document.getElementById(
      "post-search"
    ) as HTMLInputElement;
    searchBar.value = "";
  };

  return (
    <>
      <div className=" bg-white block lg:mt-1.5 ml-auto dark:bg-gray-800 mb-1">
        <form
          className="flex items-center"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label className="sr-only">Search</label>
          <div className="relative lg:w-64 xl:w-96 flex">
            <input
              type="text"
              name="post"
              id="post-search"
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="search"
              autoComplete="false"
            />
            <button
              type="submit"
              className="bg-emerald-600 rounded-r-lg px-2.5 flex items-center cursor-pointer hover:bg-emerald-500"
            >
              <span className="material-symbols-outlined material-icons md-24 ">
                search
              </span>
            </button>
            {searchString !== "" ? (
              <button
                onClick={() => {
                  handleClear();
                }}
                className="text-xs ml-1 text-gray-400 absolute right-14 top-3"
              >
                <span className="material-symbols-outlined material-icons filled md-18">
                  cancel
                </span>
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}
