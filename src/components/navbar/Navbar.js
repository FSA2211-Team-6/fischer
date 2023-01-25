import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="shadow-sm fixed w-full z-10">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items items-center mx-20 justify-between w-full">
              <div className="flex jusity-center items-center flex-shrink-0">
                <h1 className="font-bold text-xl cursor-pointer">FISCHER</h1>
              </div>
              <div className="hidden md:block">
                <div className="m1-10 flex items-baseline space-x-4">
                  <Link
                    className="cursor-pointer text-green-600 font-semibold px-3 py-2 text-sm hover:font-black"
                    href="/"
                  >
                    HOME
                  </Link>
                  <Link
                    className="cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/search"
                  >
                    Search
                  </Link>
                  <Link
                    className="cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/login"
                  >
                    Log In
                  </Link>
                  <Link
                    className="cursor-pointer hover:bg-green-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <div className="mr-10 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus: outline-none focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen ? (
          <div className="md:hidden id:mobile-menu">
            <div className="bg-white px-2 pt-3 pb-3 space-y-1 sm:px-3">
              <Link
                href="/home"
                className="cursor-pointer hover:bg-green-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
