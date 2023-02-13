import React, { useState } from "react";

export default function AddTopic() {
  const [showModal, setShowModal] = useState(false);

  const addTopic = async (name: string) => {
    // actual user id, not fischerId
    const response = await fetch(`/api/topic/${name}/${name}`);
    await response.json();
  };

  const enterKeyPressed = (event: any) => {
    event.preventDefault();
    if (event.keyCode == 13) {
      addTopic(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="inline-flex items-center px-5 py-1.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
      >
        Add Topic?
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* Add Topic Content */}
              <div
                className=" z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
                id="delete-user-modal"
              >
                <div className="relative w-full h-full max-w-md px-4 md:h-auto">
                  {/* <!-- Modal content --> */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-around p-2">
                      <h2 className="p-3">Add Topic?</h2>
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
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className=" pt-0 text-center">
                      <div className="p-4 bg-white block  items-center justify-between  border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                          <div className="relative mt-1 lg:w-64 xl:w-96">
                            <input
                              type="text"
                              name="email"
                              id="topics-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="What topic do you want to add?"
                              onKeyUp={enterKeyPressed}
                            />
                          </div>
                        </div>
                      </div>
                      <a
                        onClick={() => setShowModal(false)}
                        href="#"
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        data-modal-toggle="delete-user-modal"
                      >
                        Close
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
