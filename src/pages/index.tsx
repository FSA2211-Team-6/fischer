import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { LogInButton } from "@/components/LogInButton";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/store";
import AllPosts from "@/components/allPosts";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import allPostsSlice, {
  setInitialPosts,
  addPost,
  selectAllPosts,
  updateCursor,
} from "@/redux/slices/allPostsSlice";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import prisma from "../../server/db/prismadb";
import SideBar from "@/components/sideBar";
import Header from "@/components/header";
import Stats from "@/components/stats";
import Filters from "@/components/filters";

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

export default function Home({
  firstPosts,
  myCursor,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session, status } = useSession();
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
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <SideBar />
          {/* middle section*/}
          <div className="flex flex-col w-full md:space-y-4">
            <Header />
            {/* middle section below header */}
            <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Good afternoon, {session ? session.user.name : null}
              </h1>
              <h2 className="text-gray-400 text-md">
                Here&#x27;s the figgity fax of the week!
              </h2>
              <Stats />
              <Filters />
              {/*Initial Posts*/}
              <AllPosts firstPosts={firstPosts} infiniteScroll={false} />
              {/* Infinite Scroll Posts */}
              <AllPosts firstPosts={morePosts} infiniteScroll={true} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
