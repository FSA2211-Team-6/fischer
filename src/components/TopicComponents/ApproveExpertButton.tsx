import React from "react";

export default function ApproveExpertButton({ fischerId, topicId }: any) {
  const approveExpert = async () => {
    await fetch(`/api/expert/${fischerId}/${topicId}/true`, {
      method: "PUT",
    });
  };

  return (
    <>
      <button
        onClick={approveExpert}
        type="button"
        className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white rounded-lg bg-green-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <p>Approve</p>
      </button>
    </>
  );
}
