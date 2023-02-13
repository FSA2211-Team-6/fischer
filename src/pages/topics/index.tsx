import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import AddTopic from "@/components/SharedComponents/AddTopic";
import PostsByTopicButton from "@/components/TopicComponents/PostsByTopicButton";
import ApplyExpertButton from "@/components/TopicComponents/ApplyExpertButton";
import ExpertsByTopicButton from "@/components/TopicComponents/ExpertsByTopicButton";
import EditTopic from "@/components/TopicComponents/EditTopic";

export default function Topics() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [topics, setTopics] = useState([]);
  const { data: session } = useSession();

  const getTopics = async (page: number, filter: string) => {
    const data = await fetch(`/api/topics/${page}/${filter}`);
    const topicData = await data.json();
    setTopics(topicData);
  };

  useEffect(() => {
    getTopics(page, filter);
  }, [page, filter, topics]);

  // query functions
  const nextPage = () => {
    if (topics.length === 20) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const search = (event: any) => {
    event.preventDefault();
    if (event.keyCode == 13) {
      setFilter(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <>
      {/* QUERY STUFF, TOP BAR */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {filter.length ? "Your search: " + filter : "All Topics"}
            </h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="topics-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for topics"
                  onKeyUp={search}
                />
              </div>
            </div>
          </div>
        </div>
        <AddTopic />
      </div>
      {/*QUERY ABILITIES ^^^^ ////TABLE vvv */}
      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Topic
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Posts
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Actions
                    </th>
                    {session?.user.isAdmin ? (
                      <>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                        >
                          Topic Id
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                        >
                          Experts
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                        >
                          Admin
                        </th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {topics.map((topic: Topic) => {
                    return (
                      <tr key={topic.name}>
                        <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          <span className="font-semibold">{topic.name}</span>
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          <PostsByTopicButton />
                        </td>
                        {session ? (
                          <>
                            <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                              <ApplyExpertButton {...topic} />
                            </td>
                            {session.user.isAdmin ? (
                              <>
                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  {topic.id}
                                </td>
                                <td className="inline-flex items-center p-4 space-x-2 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <ExpertsByTopicButton />
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <EditTopic {...topic} />
                                </td>
                              </>
                            ) : null}
                          </>
                        ) : (
                          <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                            <Link href="/api/auth/signin">
                              Sign In To Apply For Expertise
                            </Link>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
