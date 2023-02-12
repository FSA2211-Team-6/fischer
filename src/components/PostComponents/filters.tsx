import PostSearch from "../SharedComponents/postSearch";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  selectSearchData,
  clearSearchData,
} from "@/redux/slices/allPostsSlice";

const Filters = () => {
  const dispatch = useAppDispatch();
  const statFilter = useAppSelector(selectSearchData).statsFilter;
  return (
    <>
      <div className="flex mt-24">
        {statFilter ? (
          <div
            onClick={() => {
              dispatch(clearSearchData());
            }}
            className="flex items-end hover:cursor-pointer text-xs gap-2"
          >
            <span className="material-symbols-outlined material-icons md-24">
              filter_alt_off
            </span>
            clear filter
          </div>
        ) : null}

        <PostSearch />
      </div>
    </>
  );
};

export default Filters;
