import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ApplyExpertButton(topic: Topic) {
  const { data: session } = useSession();
  const [expertise, setExpertise] = useState<any | null>(null);

  const applyExpert = async () => {
    await fetch(`/api/expert/${session?.user.fischerId}/${topic.id}`, {
      method: "POST",
    });
    setExpertise(true);
  };

  const getExpertise = async () => {
    const data = await fetch(
      `/api/expert/${session?.user.fischerId}/${topic.id}`,
      { method: "GET" }
    );
    const parseData = await data.json();
    setExpertise(parseData);
  };

  useEffect(() => {
    getExpertise();
  }, [expertise]);

  return (
    <>
      {session && !expertise ? (
        <button
          onClick={applyExpert}
          type="button"
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white rounded-lg bg-pink-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <p>Apply for Expertise</p>
        </button>
      ) : expertise!.approval ? (
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
          Approved
        </span>
      ) : expertise?.approval === false ? (
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-red-100 dark:border-red-400 dark:bg-gray-700 dark:text-red-400">
          Denied
        </span>
      ) : (
        <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-orange-100 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300">
          In review
        </span>
      )}
    </>
  );
}
