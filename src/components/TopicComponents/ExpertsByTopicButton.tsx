import React from "react";
import Link from "next/link";

export default function ExpertsByTopicButton() {
  return (
    <>
      <Link href="/users">
        <button
          type="button"
          data-modal-toggle="edit-user-modal"
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white rounded-lg bg-teal-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <p>See Experts</p>
        </button>
      </Link>
    </>
  );
}
