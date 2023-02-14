import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { mutate } from "swr";

export default function CommentBox({
  post,
  userId,
  isExpertResponse,
  currExpertId,
}: any) {
  const [comment, setComment] = useState<string>("");
  const fetcher = (url: string, obj: object) =>
    fetch(url, obj).then((res) => res.json());

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    setComment(commentValue);
  };

  const commentData: object = {
    postId: post.singlePostData.id,
    fischerId: userId,
    content: comment,
  };

  const expertResponseData: object = {
    postId: post.singlePostData.id,
    expertId: currExpertId,
    content: comment,
  };

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const response = await fetcher(
      `fischer.onrender.com/api/posts/${post.singlePostData.id}/comments`,
      {
        method: "POST",
        body: JSON.stringify(commentData),
      }
    );
    mutate(`fischer.onrender.com/api/posts/${post.singlePostData.id}/comments`);
    setComment("");
  };

  const handleExpertResponseSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const existingCommentsResponse = await fetch(
      `fischer.onrender.com/api/posts/${post.singlePostData.id}/experts`,
      { method: "GET" }
    );
    const existingComments = await existingCommentsResponse.json();

    const expertHasCommented = existingComments.find(
      (comment: any) => comment.expertId === currExpertId
    );

    if (expertHasCommented) {
      alert(
        "Response not submitted. An Expert can only submit one Expert Response per post!"
      );
      return;
    }

    const response = await fetcher(
      `fischer.onrender.com/api/posts/${post.singlePostData.id}/experts`,
      {
        method: "POST",
        body: JSON.stringify(expertResponseData),
      }
    );
    mutate(`fischer.onrender.com/api/posts/${post.singlePostData.id}/experts`);
    setComment("");
  };

  return (
    <div className="flex justify-center ">
      <div className=" max-w-3xl w-full outline-1 outline-slate-400">
        <form
          onSubmit={(event) => {
            isExpertResponse //if the toggle is checked, then submit expert response, else it's a regular comment
              ? handleExpertResponseSubmit(event)
              : handleCommentSubmit(event);
          }}
          className="flex-col items-center mt-8 flex  border border-gray-600 rounded-lg"
        >
          <textarea
            id="textArea"
            value={comment}
            onChange={(event) => {
              onChange(event);
            }}
            placeholder="What are your thoughts?"
            className="flex pt-2 pl-4 w-full  rounded-lg bg-gray-700 min-h-[100px]"
          ></textarea>
          <div className="flex w-full bg-gray-600 ">
            <div className="flex ml-auto">
              {comment.trim() === "" ? (
                <button
                  className=" px-4 py-1 text-white bg-green-900 rounded-full focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 shadow-md opacity-60"
                  disabled
                >
                  Comment
                </button>
              ) : (
                <button className=" px-4 py-1 text-white bg-green-900 rounded-full hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 shadow-md ">
                  Comment
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
