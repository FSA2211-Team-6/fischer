import React, { useState } from "react";

export default function DeleteModal(user: user) {
  const [showModal, setShowModal] = useState(false);

  const deleteUser = async (id: string) => {
    // actual user id, not fischerId
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    //const data = await response.json();
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        data-modal-toggle="delete-user-modal"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Delete user
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                {/* Delete User Modal */}
                <div
                  className=" z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
                  id="delete-user-modal"
                >
                  <div className="relative w-full h-full max-w-md px-4 md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                      {/* <!-- Modal header --> */}
                      <div className="flex justify-end p-2">
                        <button
                          onClick={() => setShowModal(false)}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                          data-modal-toggle="delete-user-modal"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {/* <!-- Modal body --> */}
                      <div className="p-6 pt-0 text-center">
                        <svg
                          className="w-16 h-16 mx-auto text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete {" " + user.name}?
                        </h3>
                        <a
                          onClick={() => {
                            deleteUser(user.id);
                          }}
                          href="#"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800"
                        >
                          Yes, Im sure
                        </a>
                        <a
                          onClick={() => setShowModal(false)}
                          href="#"
                          className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                          data-modal-toggle="delete-user-modal"
                        >
                          No, cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
