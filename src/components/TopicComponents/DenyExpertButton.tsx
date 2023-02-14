import React from "react";

export default function DenyExpertButton({ fischerId, topicId }) {
  const denyExpert = async () => {
    await fetch(`/api/expert/${fischerId}/${topicId}/false`, {
      method: "PUT",
    });
  };

  return (
    <>
      <button
        onClick={denyExpert}
        type="button"
        className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white rounded-lg bg-red-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <p>Deny</p>
      </button>
    </>
  );
}
