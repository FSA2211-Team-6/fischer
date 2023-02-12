import React from "react";
import Experts from "./experts/expertsSection";
import Comments from "./comments/commentsSection";

export default function Tabs({ post, tabSelection }: any) {
  const [openTab, setOpenTab] = React.useState(Number(tabSelection));
  return (
    <div className="flex flex-wrap h-full overflow-visible">
      <div className="w-full overflow-visible">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          <li className="-mb-px mx-2 last:mr-0 flex-auto text-center ">
            <a
              className={
                "text-sm uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white underline bg-gray-600 transition-opacity ease-in opacity-100 duration-500"
                  : "text-white  bg-gray-700 hover:bg-gray-600 opacity-50")
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
                  ? "text-white underline bg-gray-600 transition-opacity ease-in opacity-100 duration-500"
                  : "text-white  bg-gray-700 hover:bg-gray-600 opacity-50")
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
        <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-2 pb-6 shadow-lg rounded h-full">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space ">
              <div className={openTab === 1 ? "block" : "hidden"} id="experts">
                <Experts post={post} />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="comments">
                <Comments post={post} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
