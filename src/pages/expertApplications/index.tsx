import React, { useEffect, useState } from "react";
import ApproveExpertButton from "@/components/TopicComponents/ApproveExpertButton";
import DenyExpertButton from "@/components/TopicComponents/DenyExpertButton";
import { useSession } from "next-auth/react";

export default function ExpertApplications() {
  const { data: session } = useSession();

  const [expertApplications, setExpertApplications] = useState([]);

  const getExpertApplications = async () => {
    const data = await fetch(`/api/expertApplications/0`);
    const expertData = await data.json();
    setExpertApplications(expertData);
  };

  useEffect(() => {
    getExpertApplications();
  }, [expertApplications]);
  if (!session?.user.isAdmin) return <>404 Nothing Found</>;
  else {
    return (
      <>
        {expertApplications.length ? (
          <>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Id
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Topic
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Topic Id
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Applied At
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {/* ########## USER DATA BEING MAPPED ########### */}
                        {expertApplications.map((expert: any) => {
                          return (
                            <tr
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
                              key={expert.id}
                            >
                              <td className="w-4 p-4">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  {expert.user.fischerId}
                                </div>
                              </td>
                              <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                                    {expert.user.name}
                                  </div>
                                </div>
                              </td>
                              <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                {expert.topic.name}
                              </td>
                              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {expert.topic.id}
                              </td>
                              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {expert.createdAt}
                              </td>
                              <td className="p-4 space-x-2 whitespace-nowrap">
                                <ApproveExpertButton
                                  fischerId={expert.user.fischerId}
                                  topicId={expert.topic.id}
                                />
                                <DenyExpertButton
                                  fischerId={expert.user.fischerId}
                                  topicId={expert.topic.id}
                                />
                              </td>
                            </tr>
                          );
                        })}
                        {/* END OF USER DATA MAPPING */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <h1>No expert applications to be shown</h1>
            </div>
          </>
        )}
        {/* ^^ ALL USERS ^^ MAP THAT  BELOW IS PAGINATION AND SHIT */}
      </>
    );
  }
}
