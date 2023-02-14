import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function SingleExpertResponse({
  expertResponse,
  handleDeleteExpertResponse,
  post,
}: any) {
  const [userId, setUserId] = React.useState<number | null>(null);

  ////States for upvoting system
  const [upvotes, setUpvotes] = useState(0);
  const [upvotesDB, setUpvotesDB] = useState(0);
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0);
  const [userVoteArray, setUserVoteArray] = React.useState<Array<object>>([]);

  ////States for editing comments
  const [content, setContent] = useState(expertResponse.content);
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [expertiseArray, setExpertiseArray] = React.useState<Array<object>>([]);
  const [isExpert, setIsExpert] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUserId(session.user.fischerId);
    }
  }, [session]);

  ////get current user's expertise
  useEffect(() => {
    const fetchExpertiseFromUserId = async () => {
      const response = await fetch(`/api/experts/${userId}`);
      const data = await response.json();
      setExpertiseArray(data);
    };
    if (userId) {
      fetchExpertiseFromUserId();
    }
  }, [userId]);

  ////check to see if user is an expert of the current post's topic
  useEffect(() => {
    const isExpert: any = expertiseArray.find(
      (ele: any) => ele.topicId === post.singlePostData.topicId
    );
    if (isExpert) {
      setIsExpert(true);
    }
  }, [expertiseArray, post.singlePostData.topicId]);

  const fetchUserExpertResponseVote = async () => {
    const data = await fetch(`/api/userexpertresponsevote/${userId}`);
    const voteData = await data.json();
    setUserVoteArray(voteData);
  };

  useEffect(() => {
    const fetchUserExpertResponseVote = async () => {
      const data = await fetch(`/api/userexpertresponsevote/${userId}`);
      const voteData = await data.json();
      setUserVoteArray(voteData);
    };
    if (userId) {
      fetchUserExpertResponseVote();
    }
  }, [userId]);

  useEffect(() => {
    setUpvotesDB(expertResponse.upvotes);
  }, [expertResponse.upvotes]);

  useEffect(() => {
    const userExpertResponseVote: any = userVoteArray.find(
      (ele: any) => ele.expertResponseId === expertResponse.id
    );
    if (userExpertResponseVote) {
      setUserVote(userExpertResponseVote.compliance);
    }
  }, [userVoteArray, expertResponse.id]);

  const updateExpertResponseUpvotes = async (
    upvotesIncrement: number,
    expertResponseId: number
  ) => {
    const expertResponseData = {
      upvotes: upvotesDB + upvotesIncrement,
      expertResponseId: expertResponse.id,
      fischerId: userId,
    };
    const putResponse = await fetch(
      `/api/expertresponses/${expertResponseId}`,
      {
        method: "PUT",
        body: JSON.stringify(expertResponseData),
      }
    );
    const data = await putResponse.json();
    fetchUserExpertResponseVote();
    setUpvotesDB((upvotesDB) => {
      return upvotesDB + upvotesIncrement;
    });
  };

  const sendVoteToDB = async (compliance: number, expertResponseId: number) => {
    const userExpertResponseVote = {
      fischerId: userId,
      expertResponseId: expertResponseId,
      compliance: compliance,
    };
    //check to see if user has voted on expertResponse. create/update vote
    if (
      userVoteArray.find(
        (ele: any) => ele.expertResponseId === expertResponse.id
      )
    ) {
      const putResponse = await fetch(`/api/userexpertresponsevote/${userId}`, {
        method: "PUT",
        body: JSON.stringify(userExpertResponseVote),
      });
      const data = await putResponse.json();
    } else {
      const postResponse = await fetch(
        `/api/userexpertresponsevote/${userId}`,
        {
          method: "POST",
          body: JSON.stringify(userExpertResponseVote),
        }
      );
      const createData = await postResponse.json();
    }
    fetchUserExpertResponseVote();
  };

  const handleUpvotes = async (expertResponseId: number) => {
    if (userVote === 1) {
      setUpvotes(upvotes - 1);
      setUserVote(0);
      await sendVoteToDB(0, expertResponseId);
      await updateExpertResponseUpvotes(-1, expertResponseId);
    } else if (userVote === -1) {
      setUpvotes(upvotes + 2);
      setUserVote(1);
      await sendVoteToDB(1, expertResponseId);
      await updateExpertResponseUpvotes(2, expertResponseId);
    } else if (userVote === 0) {
      setUpvotes(upvotes + 1);
      setUserVote(1);
      await sendVoteToDB(1, expertResponseId);
      await updateExpertResponseUpvotes(1, expertResponseId);
    }

    return upvotesDB;
  };

  const handleDownvotes = async (expertResponseId: number) => {
    if (userVote === -1) {
      setUpvotes(upvotes + 1);
      setUserVote(0);
      await sendVoteToDB(0, expertResponseId);
      await updateExpertResponseUpvotes(1, expertResponseId);
    } else if (userVote === 1) {
      setUpvotes(upvotes - 2);
      setUserVote(-1);
      await sendVoteToDB(-1, expertResponseId);
      await updateExpertResponseUpvotes(-2, expertResponseId);
    } else if (userVote === 0) {
      setUpvotes(upvotes - 1);
      setUserVote(-1);
      await sendVoteToDB(-1, expertResponseId);
      await updateExpertResponseUpvotes(-1, expertResponseId);
    }
  };

  ////////editing expertResponse////////
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setContent(expertResponse.content);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editExpertResponse(content, expertResponse.id);
    setIsEditing(false);
  };

  const editExpertResponse = async (
    content: number,
    expertResponseId: number
  ) => {
    const expertResponseData = {
      content: content,
      expertResponseId: expertResponseId,
    };
    try {
      const putResponse = await fetch(
        `http://localhost:3000/api/expertresponses/${expertResponseId}`,
        {
          method: "PUT",
          body: JSON.stringify(expertResponseData),
        }
      );
      const data = await putResponse.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative flex  justify-center  antialiased   min-w-screen">
      <div className="container px-0 mx-auto sm:px-5 pb-4">
        <div className="flex-col w-full py-2 mx-auto bg-gray-800 border-b-2 border-r-2 border-gray-900 sm:px-4 sm:py-2 md:px-4 sm:rounded-lg sm:shadow-sm ">
          <div className="flex flex-row">
            {/* COMMENTER IMG HERE */}
            <Image
              className="object-cover w-12 h-12 mt-3 border-2 border-gray-300 rounded-full"
              alt="avatar"
              src={expertResponse.expert.user.image}
              width={100}
              height={100}
            />
            <div className="flex-col mt-1 w-full">
              <div className="flex items-center flex-1 px-4 font-bold text-white leading-tight">
                {/* COMMENTER NAME HERE */}
                {expertResponse.expert.user.name}
                <div className="bg-green-900 text-white text-xs w-max inline font-bold rounded-full pl-3 pr-3 pt-1 pb-1 ml-2">
                  EXPERT
                </div>
                <span className="ml-2 text-xs font-normal text-gray-400">
                  {/* COMMENT TIME HERE*/}
                  {new Date(expertResponse.createdAt).toLocaleString()}
                </span>
                <div className="ml-auto"></div>
              </div>
              <div className="flex-1 px-2 ml-2 mt-1 text-sm font-medium leading-2 text-gray-300">
                {/* COMMENT HERE */}
                <div>
                  {isEditing ? (
                    <form onSubmit={handleFormSubmit}>
                      <input
                        type="text"
                        value={content}
                        onChange={handleContentChange}
                      />
                      <button type="submit">Edit Comment</button>
                    </form>
                  ) : (
                    <div>
                      <p>{content}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-start">
                {/* UPVOTE BUTTON */}
                <button
                  onClick={(e: any) => {
                    handleUpvotes(expertResponse.id);
                  }}
                  className="items-center px-1 pt-1 ml-1 "
                >
                  <svg
                    className={`flex  w-5 h-5 ml-2 text-gray-400 cursor-pointer hover:fill-green-200 ${
                      userVote === 1 ? "fill-green-400" : "fill-none"
                    }`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                </button>
                <div className="upvotes-text flex items-center text-sm mx-2 mt-1">
                  {/* upVotes HERE */}
                  {upvotesDB}
                </div>
                {/* DOWNVOTE BUTTON */}
                <button
                  onClick={(e: any) => handleDownvotes(expertResponse.id)}
                  className="flex items-center px-1 mt-1"
                >
                  <svg
                    className={`w-5 h-5 text-gray-400 cursor-pointer hover:fill-red-300 ${
                      userVote === -1 ? "fill-red-400" : "fill-none"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                    />
                  </svg>
                </button>

                {/* EDIT BUTTON */}
                {userId === expertResponse.expert.fischerId ? (
                  <button
                    onClick={(e: any) => handleEditClick()}
                    className="edit-button flex group items-center justify-center relative px-1 mt-1 text-gray-400 fill-none hover:fill-gray-600 ml-auto"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-600 px-2 py-1 text-xs text-white rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                    >
                      Edit
                    </span>
                  </button>
                ) : (
                  <></>
                )}
                {/* DELETE BUTTON */}
                {userId === expertResponse.expert.fischerId ? (
                  <button
                    onClick={(e: any) =>
                      handleDeleteExpertResponse(expertResponse.id)
                    }
                    className="delete-button flex group items-center justify-center relative px-1 mt-1 ml-3 text-red-400 fill-none hover:fill-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-600 px-2 py-1 text-xs text-white rounded-md absolute left-1/2 
                                      -translate-x-1/2 -translate-y-full mt-1 opacity-0 m-4 mx-auto w-max"
                    >
                      Delete ExpertResponse
                    </span>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
