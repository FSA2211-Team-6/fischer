import { store, useAppSelector } from "@/redux/store";
import React, { useEffect, useMemo, useRef } from "react";
import { useAppDispatch } from "@/redux/store";
import { fetchInitialPosts, rehydrate } from "@/redux/slices/allPostsSlice";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AllPosts from "@/components/PostComponents/allPosts";
import Filters from "@/components/PostComponents/filters";

export const getServerSideProps: GetServerSideProps = async () => {
  const numPosts = 3;
  await store.dispatch(fetchInitialPosts(numPosts));

  const firstPosts = store.getState().allPosts;

  return {
    props: {
      firstPosts,
    },
  };
};

export default function Posts({
  firstPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (store.getState().allPosts.filteredPosts.length == 0) {
      dispatch(rehydrate(firstPosts));
    }
  }, [dispatch, firstPosts]);

  return (
    <>
      <Filters />
      <AllPosts firstPosts={firstPosts} />
    </>
  );
}
