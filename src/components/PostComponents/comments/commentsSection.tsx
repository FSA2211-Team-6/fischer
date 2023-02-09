import React, { useState } from "react";
import useSWR from "swr";
import SingleComment from "./singleComment";

export default function Comments({ post }: any) {
  const [refetch, setRefetch] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: comments, error } = useSWR(
    () =>
      post.singlePostData.id
        ? `http://localhost:3000/api/posts/${post.singlePostData.id}/comments`
        : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  if (error) return <h1>Something went wrong!</h1>;
  if (!comments) return <h1>Loading...</h1>;

  return (
    <>
      {/* COMMENT Map begins*/}
      {comments.map((comment: any) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          onUpvoteChange={handleRefetch}
        />
      ))}
    </>
  );
}
