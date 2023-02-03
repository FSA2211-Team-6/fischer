import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const LogInButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* <p>{session.user.name}</p>
        <a href="#" classNameName="relative block">
          <Image
            loader={() => session.user.image}
            alt="profile"
            src={session.user.image}
            width={100}
            height={100}
            classNameName="mx-auto object-cover rounded-full h-10 w-10 "
          />
        </a>
        <button onClick={() => signOut()}>Sign out</button> */}
        {/* <!-- Profile --> */}
        <button onClick={() => signOut()}>Sign out</button>
        <div className="flex items-center ml-3">
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button-2"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-2"
            >
              <span className="sr-only">Open user menu</span>
              <Image
                className="w-8 h-8 rounded-full"
                loader={() => session.user.image}
                alt="profile"
                src={session.user.image}
                width={100}
                height={100}
              />
            </button>
          </div>
          {/* <!-- Dropdown menu --> */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-2"
          >
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900 dark:text-white" role="none">
                Neil Sims
              </p>
              <p
                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                neil.sims@flowbite.com
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
