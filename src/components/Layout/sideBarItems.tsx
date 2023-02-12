import React from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { changeFilter, clearSearchData } from "@/redux/slices/allPostsSlice";

interface props {
  name: string;
  link: string;
  viewbox: string;
  children: any;
}

export const SideBarItem = ({ name, link, viewbox, children }: props) => {
  const dispatch = useAppDispatch();

  const handleGetFeaturedPieces = async (name: string) => {
    const response = await fetch("/api/stats/featuredpieces");
    const data = await response.json();
    dispatch(changeFilter(data));
  };

  return (
    <>
      <Link
        className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800"
        href={link}
        onClick={() => {
          dispatch(clearSearchData());
          if (name === "Featured Pieces") {
            handleGetFeaturedPieces(name);
          }
        }}
      >
        <span className="text-left">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox={viewbox}
            xmlns="http://www.w3.org/2000/svg"
          >
            {children}
          </svg>
        </span>
        <span className="mx-4 text-sm font-normal">{name}</span>
      </Link>
    </>
  );
};
