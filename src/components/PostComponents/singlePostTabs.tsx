import React from "react";
import Experts from "./experts";
import Comments from "./comments";

export default function Tabs({ post }: any) {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mx-2 last:mr-0 flex-auto text-center ">
              <a
                className={
                  "text-sm uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white underline bg-gray-600 "
                    : "text-white  bg-gray-700 hover:bg-gray-600")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#experts"
                role="tablist"
              >
                Experts
              </a>
            </li>
            <li className="-mb-px last:mr-2 flex-auto text-center">
              <a
                className={
                  "text-sm uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white underline bg-gray-600 "
                    : "text-white  bg-gray-700 hover:bg-gray-600")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#comments"
                role="tablist"
              >
                Comments
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={openTab === 1 ? "block" : "hidden"}
                  id="experts"
                >
                  <Experts />
                </div>
                <div
                  className={openTab === 2 ? "block" : "hidden"}
                  id="comments"
                >
                  <Comments post={post} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
