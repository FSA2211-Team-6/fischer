import React from "react";
import useSWR from "swr";
import Image from "next/image";
import SingleComment from "./singleComment";

export default function Comments({ post }: any) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: comments, error } = useSWR(
    post.singlePostData.id
      ? `http://localhost:3000/api/posts/${post.singlePostData.id}/comments`
      : null,
    fetcher
  );
  if (error) return <h1>Something went wrong!</h1>;
  if (!comments) return <h1>Loading...</h1>;

  return (
    <>
      {/* COMMENT Map begins*/}
      {comments.map((comment: any) => (
        <SingleComment key={comment.id} comment={comment} />
      ))}
    </>
  );
}
