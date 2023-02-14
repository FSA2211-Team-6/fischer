import React, { useState, useEffect } from "react";
import useSWR from "swr";
import SingleExpertResponse from "./singleExpertResponse";

export default function Experts({ post }: any) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [deletedExpertResponseId, setDeletedExpertResponseId] = useState<
    number | null
  >(null);

  const { data: expertResponses, error } = useSWR(
    () =>
      post.singlePostData.id
        ? `https://fischer.onrender.com/api/posts/${post.singlePostData.id}/experts`
        : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  //////creating the handleDeleteComment here and then passing it as a prop to singleComment component. im storing deletedCommentId in a local state and then filtering it out so user will see immediate "refresh" after deleting a comment

  const handleDeleteExpertResponse = async (expertResponseId: number) => {
    try {
      const response = await fetch(
        `https://fischer.onrender.com/api/expertresponses/${expertResponseId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDeletedExpertResponseId(expertResponseId);
      } else {
        throw new Error("Failed to delete expert response");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <h1>Something went wrong!</h1>;
  if (!expertResponses) return <h1>Loading...</h1>;

  ///// filter the comments to exclude the deleted comment
  const filteredExpertResponses = deletedExpertResponseId
    ? expertResponses.filter(
        (expertResponse: any) => expertResponse.id !== deletedExpertResponseId
      )
    : expertResponses;

  const newResponses = filteredExpertResponses.filter(
    (expertResponse: any) => expertResponse.content.trim() !== ""
  );

  return (
    <>
      {/* COMMENT Map begins*/}
      {newResponses.map((expertResponse: any) => (
        <SingleExpertResponse
          key={expertResponse.id}
          expertResponse={expertResponse}
          handleDeleteExpertResponse={handleDeleteExpertResponse}
          post={post}
        />
      ))}
    </>
  );
}
