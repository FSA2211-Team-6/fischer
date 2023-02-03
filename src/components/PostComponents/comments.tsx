import React from "react";
export default function Comments() {
  return (
    <>
      <section className="relative flex  justify-center  antialiased   min-w-screen">
        <div className="container px-0 mx-auto sm:px-5">
          <div className="flex-col w-full py-2 mx-auto bg-gray-800 border-b-2 border-r-2 border-gray-900 sm:px-4 sm:py-2 md:px-4 sm:rounded-lg sm:shadow-sm mb-4">
            <div className="flex flex-row">
              {/* USER IMG HERE */}
              <img
                className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                alt="eddie's avatar"
                src="https://ca.slack-edge.com/T024FPYBQ-U044LRSBS3F-8b230715abb7-512"
              />
              <div className="flex-col mt-1">
                <div className="flex items-center flex-1 px-4 font-bold text-white leading-tight">
                  {/* USER NAME HERE */}
                  Eddie F
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    {/* COMMENT TIME HERE*/}2 weeks ago
                  </span>
                </div>
                <div className="flex-1 px-2 ml-2 text-sm font-medium leading-2 text-gray-300">
                  {/* COMMENT HERE */}
                  {`This one is for the boys with the booming system
                    Top down, AC with the cooler system`}
                </div>
                {/* UPVOTE BUTTON */}
                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                  <svg
                    className="w-5 h-5 ml-2 text-gray-400 cursor-pointer hover:fill-green-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                </button>
                {/* DOWNVOTE BUTTON */}
                <button className="inline-flex items-center px-1 -ml-1 flex-column">
                  <svg
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:fill-red-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/*  NEW TEST COMMENT*/}

          <div className="flex-col w-full py-2 mx-auto bg-gray-800 border-b-2 border-r-2 border-gray-900 sm:px-4 sm:py-2 md:px-4 sm:rounded-lg sm:shadow-sm ">
            <div className="flex flex-row">
              {/* USER IMG HERE */}
              <img
                className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                alt="eddie's avatar"
                src="https://ca.slack-edge.com/T024FPYBQ-U044LRSBS3F-8b230715abb7-512"
              />
              <div className="flex-col mt-1">
                <div className="flex items-center flex-1 px-4 font-bold text-white leading-tight">
                  {/* USER NAME HERE */}
                  Eddie F
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    {/* COMMENT TIME HERE*/}2 weeks ago
                  </span>
                </div>
                <div className="flex-1 px-2 ml-2 text-sm font-medium leading-2 text-gray-300">
                  {/* COMMENT HERE */}
                  {`Boy, you got my heartbeat runnin' away Beating like a drum and
                  it's coming your way Can't you hear that Boom, badoom, boom,
                  boom, badoom, boom, bass?`}
                </div>
                {/* UPVOTE BUTTON */}
                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                  <svg
                    className="w-5 h-5 ml-2 text-gray-400 cursor-pointer hover:fill-green-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                </button>
                {/* DOWNVOTE BUTTON */}
                <button className="inline-flex items-center px-1 -ml-1 flex-column">
                  <svg
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:fill-red-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
