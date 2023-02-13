import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ApplyExpertButton(topic: Topic) {
  const { data: session } = useSession();
  const [applied, setApplied] = useState(false);

  const applyExpert = async () => {
    await fetch(`/api/expert/${session?.user.fischerId}/${topic.id}`, {
      method: "PUT",
    });
    setApplied(true);
  };

  const expertise = async () => {
    const data = await fetch(
      `/api/expert/${session?.user.fischerId}/${topic.id}`,
      { method: "GET" }
    );
    const parseData = await data.json();
    parseData ? setApplied(true) : null;
  };

  useEffect(() => {
    expertise();
  }, [applied]);

  return (
    <>
      {session && !applied ? (
        <button
          onClick={applyExpert}
          type="button"
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white rounded-lg bg-pink-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <p>Apply for Expertise</p>
        </button>
      ) : (
        <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-orange-100 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300">
          In review
        </span>
      )}
    </>
  );
}
