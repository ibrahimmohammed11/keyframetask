import React, { Fragment, useRef, useState } from "react";
import ThemeToggler from "../ThemeToggler";
import Image from "next/image";
import keyframe from "../../public/keyframe.png";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <Fragment>
      <nav className="dark:border-gray-700 border-gray-200 border-b font-mono	">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" passHref>
                <a>
                  <Image
                    src={keyframe}
                    alt="keyframe"
                    width={40}
                    height={40}
                    className="mr-3"
                  />
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-20 flex space-x-4">
                  <Link href="/" passHref>
                    <a
                      className={`${
                        pathname == "/"
                          ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                          : "block px-3 py-2 rounded-md cursor-pointer"
                      }`}
                    >
                      Home
                    </a>
                  </Link>

                  <Link href="/users" passHref>
                    <a
                      className={`${
                        pathname == "/users"
                          ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                          : "block px-3 py-2 rounded-md cursor-pointer"
                      }`}
                    >
                      Users
                    </a>
                  </Link>

                  <Link href="/movies" passHref>
                    <a
                      className={`${
                        pathname == "/movies"
                          ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                          : "block px-3 py-2 rounded-md cursor-pointer"
                      }`}
                    >
                      Movies
                    </a>
                  </Link>

                  <Link href="/moviespagi" passHref>
                    <a
                      className={`${
                        pathname == "/moviespagi"
                          ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                          : "block px-3 py-2 rounded-md cursor-pointer"
                      }`}
                    >
                      Movies 2
                    </a>
                  </Link>

                  <Link href="/about" passHref>
                    <a
                      className={`${
                        pathname == "/about"
                          ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                          : "block px-3 py-2 rounded-md cursor-pointer"
                      }`}
                    >
                      About
                    </a>
                  </Link>

                  <Link href="/blog" passHref>
                    <a
                      className={`${
                        pathname == "/blog"
                          ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                          : "block px-3 py-2 rounded-md cursor-pointer"
                      }`}
                    >
                      Blog
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {!session && (
                  <Link href="/api/auth/signin">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        signIn();
                      }}
                      className="bg-blue-500 text-white block p-2 rounded-md cursor-pointer text-sm"
                    >
                      Sign In
                    </a>
                  </Link>
                )}
                {session && (
                  <Link href="/api/auth/signout">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                      className="bg-blue-500 text-white block p-2 rounded-md cursor-pointer text-sm"
                    >
                      Sign Out
                    </a>
                  </Link>
                )}
                {session && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={session?.user?.image}
                      alt="user"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="hidden sm:block">
                      {session?.user?.name}
                    </span>
                  </div>
                )}
              </div>
              <ThemeToggler />
            </div>
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 dark:focus:ring-offset-gray-800 dark:focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open</span>
                {!isOpen ? (
                  <MenuIcon className="text-white w-5" />
                ) : (
                  <XIcon className="text-white w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
            <div ref={menuRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" passHref>
                <a
                  className={`${
                    pathname == "/"
                      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                      : "block px-3 py-2 rounded-md cursor-pointer"
                  }`}
                >
                  Home
                </a>
              </Link>
              <Link href="/users" passHref>
                <a
                  className={`${
                    pathname == "/users"
                      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                      : "block px-3 py-2 rounded-md cursor-pointer"
                  }`}
                >
                  Users
                </a>
              </Link>
              <Link href="/movies" passHref>
                <a
                  className={`${
                    pathname == "/movies"
                      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                      : "block px-3 py-2 rounded-md cursor-pointer"
                  }`}
                >
                  Movies
                </a>
              </Link>
              <Link href="/moviespagi" passHref>
                <a
                  className={`${
                    pathname == "/moviespagi"
                      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                      : "block px-3 py-2 rounded-md cursor-pointer"
                  }`}
                >
                  Movies 2
                </a>
              </Link>
              <Link href="/about" passHref>
                <a
                  className={`${
                    pathname == "/about"
                      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                      : "block px-3 py-2 rounded-md cursor-pointer"
                  }`}
                >
                  About
                </a>
              </Link>
              <Link href="/blog" passHref>
                <a
                  className={`${
                    pathname == "/blog"
                      ? "bg-blue-500 text-white px-3 py-2 rounded-md"
                      : "block px-3 py-2 rounded-md cursor-pointer"
                  }`}
                >
                  Blog
                </a>
              </Link>
            </div>
          </div>
        </Transition>
      </nav>
    </Fragment>
  );
};
