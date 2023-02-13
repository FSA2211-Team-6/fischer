import React from "react";
import Link from "next/link";

export default function PostsByTopicButton() {
  return (
    <>
      <Link href="/posts">
        <button
          type="button"
          data-modal-toggle="edit-user-modal"
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          See Posts
        </button>
      </Link>
    </>
  );
}
