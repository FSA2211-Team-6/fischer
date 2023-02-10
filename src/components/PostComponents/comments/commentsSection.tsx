import React, { useState, useEffect } from "react";
import useSWR from "swr";
import SingleComment from "./singleComment";

export default function Comments({ post }: any) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [deletedCommentId, setDeletedCommentId] = useState<number | null>(null);

  const { data: comments, error } = useSWR(
    () =>
      post.singlePostData.id
        ? `http://localhost:3000/api/posts/${post.singlePostData.id}/comments`
        : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  //////creating the handleDeleteComment here and then passing it as a prop to singleComment component. im storing deletedCommentId in a local state and then filtering it out so user will see immediate "refresh" after deleting a comment

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDeletedCommentId(commentId);
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <h1>Something went wrong!</h1>;
  if (!comments) return <h1>Loading...</h1>;

  ///// filter the comments to exclude the deleted comment
  const filteredComments = deletedCommentId
    ? comments.filter((comment: any) => comment.id !== deletedCommentId)
    : comments;

  return (
    <>
      {/* COMMENT Map begins*/}
      {filteredComments.map((comment: any) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </>
  );
}
