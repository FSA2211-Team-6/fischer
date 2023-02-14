import { changeFilter } from "@/redux/slices/allPostsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cleanURL } from "@/library/stats/statsHelpers";
import { selectFilteredPosts } from "@/redux/slices/allPostsSlice";

const Stats = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const filteredPosts = useAppSelector(selectFilteredPosts);

  const [expertData, setExpertData] = useState<Post[] | Array<any>>([]);
  const [divisiveData, setDivisiveData] = useState<Post[] | Array<any>>([]);
  const [topSiteData, setTopSiteData] = useState<topSites>();
  const [userComplianceData, setUserComplianceData] =
    useState<userComplianceStats>();

  useEffect(() => {
    const fetchExpertData = async () => {
      const response = await fetch("/api/stats/experts");
      const data = await response.json();
      setExpertData(data);
    };

    const fetchDivisiveData = async () => {
      const response = await fetch("/api/stats/divisive");
      const data = await response.json();
      setDivisiveData(data);
    };

    const fetchTopSiteData = async () => {
      const response = await fetch("/api/stats/topsites");
      const data = await response.json();
      setTopSiteData(data);
    };

    fetchTopSiteData();
    fetchExpertData();
    fetchDivisiveData();
  }, [session]);

  useEffect(() => {
    const fetchUserComplianceData = async () => {
      if (session) {
        const response = await fetch(
          `/api/stats/usercompliance/${session?.user.fischerId}`
        );
        const data = await response.json();
        console.log(data);
        setUserComplianceData(data);
      }
    };

    fetchUserComplianceData();
  }, [session, filteredPosts]);

  const handleExpertFilter = (filterData: Post[]) => {
    dispatch(changeFilter(filterData));
  };

  return (
    <>
      <div className="px-14">
        {session ? (
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white tracking-wide">{`Hello, ${session.user.name}!`}</h1>
            <p className="text-gray-500 tracking-wide">
              {"Let's do some fact checking!"}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white tracking-wide">
              {"Hello!"}
            </h1>
            <p className="text-gray-500 tracking-wide">
              {"It's a great day for some fact checking."}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center w-full my-6 gap-4 flex-wrap xl:flex-nowrap px-14">
        <div className="px-4 py-5 bg-white shadow-lg dark:bg-gray-700 w-full 2xl:py-12 xl:py-8 ">
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined filled material-icons md-72 text-orange-400">
              local_fire_department
            </span>
            <div className="grid grid-cols-1 gap-y-2 w-4/5 sm:grid-cols-2 lg:w-1/2 2xl:w-2/3 xl:w-4/5 md:w-3/5 m-auto place-items-center">
              {topSiteData?.siteMap
                .slice(0, 4)
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .map((site) => {
                  return (
                    <div key={site.id}>
                      <div
                        onClick={() => {
                          handleExpertFilter(
                            topSiteData.posts.filter((post: Post) => {
                              return post.websiteArticle.website.id === site.id;
                            })
                          );
                          router.push("/posts");
                        }}
                        className="bg-white text-gray-700 w-20 sm:w-24 md:w-36 lg:w-36 2xl:w-32 xl:w-28 md:text-sm xl:text-sm 2xl:text-base lg:text-base text-center p-4 rounded-full py-1 text-xs  hover:bg-gray-900 hover:text-white cursor-pointer"
                      >
                        {cleanURL(site.name)}
                      </div>
                    </div>
                  );
                })}
            </div>
            <p className="text-sm text-gray-400 lg:w-1/6 md:w-1/6 2xl:w-max hidden sm:block xl:hidden 2xl:block">
              Websites with frequent submissions
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-4 sm:hidden xl:block 2xl:hidden">
            Websites with frequent submissions
          </p>
        </div>

        <div className="flex items-center w-full flex-col gap-4 sm:flex-row">
          <Link
            href={session ? "/posts" : "/api/auth/signin"}
            onClick={() => {
              if (session) {
                handleExpertFilter(userComplianceData!.sortedPosts);
              }
            }}
            className="px-4 pt-6 pb-5 bg-white shadow-lg dark:bg-gray-700 hover:bg-gray-900 w-full xl:pt-8 xl:pb-8"
          >
            <div className="flex gap-2 items-center">
              <span className="material-symbols-outlined filled material-icons md-48 text-blue-400">
                bookmark_added
              </span>
              <p className="text-5xl font-bold text-black dark:text-white">
                {session ? userComplianceData?.userCompliance.length : 0}
              </p>
            </div>
            <p className="text-sm text-gray-400 w-2/3 sm:w-32 md:w-5/6 xl:w-32 2xl:w-full">
              {session
                ? `Contributions made, see what\'s happening now!`
                : "Contributions made, sign up to start!"}
            </p>
          </Link>
          <Link
            href="/posts"
            onClick={() => {
              handleExpertFilter(divisiveData);
            }}
            className="px-4 pt-6 pb-5 bg-white shadow-lg dark:bg-gray-700 hover:bg-gray-900 w-full xl:pt-8 xl:pb-8"
          >
            <div className="flex gap-2 items-center">
              <span className="material-symbols-outlined filled material-icons md-48 text-red-400">
                call_split
              </span>
              <p className="text-5xl font-bold text-black dark:text-white">
                {divisiveData?.length}
              </p>
            </div>
            <p className="text-sm text-gray-400 w-2/3 sm:w-32 md:w-5/6 xl:w-32 2xl:w-full">
              Submissions with a high degree of divisiveness
            </p>
          </Link>
          <Link
            href="/posts"
            onClick={() => {
              handleExpertFilter(expertData);
            }}
            className="px-4 pt-6 pb-5 bg-white shadow-lg dark:bg-gray-700 hover:bg-gray-900 w-full xl:pt-8 xl:pb-8"
          >
            <div className="flex gap-2 items-center">
              <span className="material-symbols-outlined filled material-icons md-48 text-amber-200">
                person_search
              </span>
              <p className="text-5xl font-bold text-black dark:text-white">
                {expertData?.length}
              </p>
            </div>
            <p className="text-sm text-gray-400 w-3/5 md:w-4/6 xl:w-4/5 2xl:full">
              Submissions Looking for Experts
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Stats;
