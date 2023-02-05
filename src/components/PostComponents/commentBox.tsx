import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function CommentBox({ post, user }: any) {
  const [comment, setComment] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    setComment(commentValue);
  };

  useEffect(() => {
    if (user) {
      setUserId(user.fischerId);
    }
  }, [user]);

  const commentData: object = {
    postId: post.singlePostData.id,
    fischerId: userId,
    content: comment,
  };

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/posts/${post.singlePostData.id}/comments`,
      {
        method: "POST",
        body: JSON.stringify(commentData),
      }
    );
  };
  return (
    <div className="flex justify-center ">
      <div className=" max-w-3xl w-full outline-1 outline-slate-400">
        <form
          onSubmit={(event) => {
            handleCommentSubmit(event);
          }}
          className="flex-col items-center mt-8 flex  border border-gray-600 rounded-lg"
        >
          <textarea
            id="textArea"
            onChange={(event) => {
              onChange(event);
            }}
            placeholder="What are your thoughts?"
            className="flex pt-2 pl-4 w-full  rounded-lg bg-gray-700 min-h-[150px]"
          ></textarea>
          <div className="flex w-full bg-gray-600 ">
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-green-500 rounded-lg text-white">
                Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
