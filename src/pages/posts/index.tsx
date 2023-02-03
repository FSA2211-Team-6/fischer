import { useAppSelector } from "@/redux/store";
import AllPosts from "@/components/PostComponents/allPosts";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { selectAllPosts, updateCursor } from "@/redux/slices/allPostsSlice";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import prisma from "../../../server/db/prismadb";
import Filters from "@/components/PostComponents/filters";

export const getStaticProps: GetStaticProps = async () => {
  //the number of posts we want on initial load
  const numResults = 2;

  //query to get intitial posts
  const posts = await prisma.post.findMany({
    take: numResults,
    include: { websiteArticle: { include: { website: true } }, user: true },
  });

  const firstPosts: Array<firstPosts> = JSON.parse(JSON.stringify(posts));

  //place cursor at last ID.
  const myCursor = firstPosts[firstPosts.length - 1].id;

  return {
    props: {
      firstPosts,
      myCursor,
    },
  };
};

export default function Posts({
  firstPosts,
  myCursor,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dispatch = useAppDispatch();

  //this gets the new posts that were requested by infinite scroll in <AllPosts>
  //posts are added to the redux store, then retrieved here, and pushed back into the <AllPosts> component to re-render.
  const morePosts = useAppSelector(selectAllPosts);

  //this saves the cursor in redux store so we know which posts need to be retrived next in the infinite scroll.
  useEffect(() => {
    dispatch(updateCursor(myCursor));
  }, [dispatch, myCursor]);

  return (
    <>
      <Filters />
      <AllPosts firstPosts={firstPosts} infiniteScroll={false} />
      {/*Initial Posts*/}
      <AllPosts firstPosts={morePosts} infiniteScroll={true} />
      {/* Infinite Scroll Posts */}
    </>
  );
}
