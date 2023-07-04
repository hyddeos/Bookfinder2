import React, { useState } from "react";

import bookfinder_logo from "../assets/bookfinder_logo.svg";
import HandleLogin from "./HandleLogin.js";
import HandleLogout from "./HandleLogout";

export default function Header(props) {
  const [showLogin, setShowlogin] = React.useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  function clickShowLogin() {
    if (!showLogin) {
      setShowlogin("open");
    } else {
      setShowlogin(false);
    }
  }

  const clickLogout = () => {
    HandleLogout();
    props.setHasAccessToken(false);
  };

  console.log("HasToken in Header", props.hasAccessToken);

  return (
    <nav className="py-4">
      <div className="block lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="absolute top-9 left-3 flex md:hidden items-center px-3 py-2 border-dark border rounded-lg h-12 w-12"
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
        {isMobileMenuOpen && (
          <div className="origin-top-left absolute left-0 top-20 mt-4 w-full rounded-md shadow-lg bg-white ring-1 ring-dark ring-opacity-5 divide-y divide-dark">
            <div className="p-6">
              <a
                href="/"
                className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
              >
                HOME
              </a>
            </div>
            <div className="p-6">
              <a
                href="/readlist"
                className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
              >
                READ LIST
              </a>
            </div>
            <div className="p-6">
              <a
                href="/maybelist"
                className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
              >
                MAYBE LIST
              </a>
            </div>
            <div className="p-6">
              <a
                href="/notlist"
                className="block font-header  lg:inline-block lg:mt-0  hover:text-prim text-dark"
              >
                NOT LIST
              </a>
            </div>
            <div className="p-6">
              <a
                href="/updatebooks"
                className="block font-header  lg:inline-block lg:mt-0  hover:text-prim text-dark"
              >
                UPDATE SERVICES
              </a>
            </div>
            {props.hasAccessToken ? (
              <div className="p-6 block">
                <button
                  onClick={clickLogout}
                  className="inline-block text-sm px-4 py-2 leading-none
                    border-2 border-acc
                   hover:bg-acc hover:text-white
                    rounded text-acc 
                    font-header md:mt-4 lg:mt-0"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="p-6 block">
                <button
                  onClick={clickShowLogin}
                  className="inline-block text-sm px-4 py-2 leading-none
            bg-acc hover:bg-prim
            rounded text-white 
            font-header md:mt-4 lg:mt-0 "
                >
                  LOGIN
                </button>
              </div>
            )}
            <div className="p-6">
              <p
                onClick={toggleMobileMenu}
                className="block font-header  lg:inline-block lg:mt-0 text-acc hover:text-prim  "
              >
                Close Menu
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full m-auto flex justify-around flex-grow lg:flex lg:items-center mt-2 lg:w-auto ">
        <div className="flex items-center flex-shrink-0 w-48 pl-3 md:pb-3">
          <img src={bookfinder_logo} alt="bookfinder logo" />
        </div>
        <div className="w-2/4 text-center md:flex justify-around mx-2 lg:flex-grow hidden">
          <div>
            <a
              href="/"
              className="block font-header mt-4 lg:inline-block lg:mt-0 hover:text-prim mr-4 text-dark"
            >
              HOME
            </a>
          </div>
          <div>
            <a
              href="/browse"
              className="block font-header mt-4 lg:inline-block lg:mt-0  hover:text-prim mr-4 text-dark"
            >
              BROWSE
            </a>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="block font-header mt-4 lg:inline-block lg:mt-0  hover:text-prim text-dark"
            >
              <span className="mr-2">MY LISTS 🠋</span>
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right absolute -right-11 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-dark ring-opacity-5 divide-y divide-dark">
                <div className="p-3">
                  <a
                    onClick={toggleDropdown}
                    href="/readlist"
                    className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
                  >
                    READ LIST
                  </a>
                </div>
                <div className="p-3">
                  <a
                    onClick={toggleDropdown}
                    href="/maybelist"
                    className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
                  >
                    MAYBE LIST
                  </a>
                </div>
                <div className="p-3">
                  <a
                    onClick={toggleDropdown}
                    href="/notlist"
                    className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
                  >
                    NOT LIST
                  </a>
                </div>
              </div>
            )}
          </div>
          <div>
            <a
              href="/updatebooks"
              className="block font-header mt-4 lg:inline-block lg:mt-0  hover:text-prim mr-4 text-dark"
            >
              UPDATE SERVICES
            </a>
          </div>
        </div>
        {props.hasAccessToken ? (
          <div className="pr-3 md:block hidden">
            <button
              onClick={clickLogout}
              className="inline-block text-sm px-4 py-2 leading-none
                    border-2 border-acc
                   hover:bg-acc hover:text-white
                    rounded text-acc 
                    font-header mt-4 lg:mt-0"
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className="pr-3 md:block hidden">
            <button
              onClick={clickShowLogin}
              className="inline-block text-sm px-4 py-2 leading-none
            bg-acc hover:bg-prim
            rounded text-white 
            font-header mt-4 lg:mt-0 "
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
      <dialog
        open={showLogin ? "open" : false}
        className="z-50 fixed top-1/4 bg-prim rounded-md border-8 border-dark shadow-xl"
      >
        {" "}
        <div className="absolute top-2 right-0 mr-8">
          <button onClick={clickShowLogin} className="text-acc">
            Close
          </button>
        </div>
        <HandleLogin
          csrftoken={props.csrftoken}
          setShowlogin={setShowlogin}
          setHasAccessToken={props.setHasAccessToken}
        />
      </dialog>
    </nav>
  );
}
