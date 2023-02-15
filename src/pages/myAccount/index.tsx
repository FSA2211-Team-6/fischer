import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function MyAccount() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (session) {
        const data = await fetch(`/api/user/session/${session?.user.email}`);
        const parsedData = await data.json();
        setUser(parsedData);
      }
    };
    getUser();
  }, [user, session]);

  return (
    <>
      {user && user.fischerId ? (
        <div className="p-16">
          <div className="p-8 bg-gray-900 shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-white text-xl">
                    {user.posts.length}
                  </p>
                  <p className="text-white">Posts</p>
                </div>
                <div>
                  <p className="font-bold text-white text-xl">
                    {user.comments.length}
                  </p>
                  <p className="text-white">Comments</p>
                </div>
              </div>
              <div className="relative">
                <div>
                  <Image
                    className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
                    alt="Profile Picture"
                    src={user.image}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 text-center space-x-8 flex justify-between mt-20 md:mt-0 md:justify-center">
                <div>
                  <p className="font-bold text-white text-xl">
                    {user.userCompliances.length}
                  </p>
                  <p className="text-white">Opinions</p>
                </div>
                <div>
                  <p className="font-bold text-white text-xl">
                    {user.expertise.length}
                  </p>
                  <p className="text-white">Expertises</p>
                </div>
              </div>
            </div>
            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-white">{user.name}</h1>
              <p className="font-light text-gray-600 mt-3">
                Fischer ID: {user.fischerId}
              </p>
              {user.isAdmin ? (
                <h1 className="mt-8 text-gray-500"> Admin of Fischer </h1>
              ) : (
                <h1 className="mt-8 text-gray-500"> Member of Fischer</h1>
              )}
            </div>
            <div className="mt-12 flex flex-col justify-center">
              <h1 className="text-white text-2xl font-medium text-center lg:px-22">
                Expertises
              </h1>
              <p className="text-gray-600 text-center font-light lg:px-16">
                {user.expertise.map((expertise: any) => {
                  return expertise.topic.name + ", ";
                })}
              </p>
              <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                Show more
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p> Loading... </p>
      )}
    </>
  );
}
