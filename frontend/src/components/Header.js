import React, { useState, useEffect } from "react";

export default function Header(props) {
  const [showLogin, setShowlogin] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // If there is a log-in error, show the login screen.
  useEffect(() => {
    if (props.error) {
      console.log("in", errorMsg);
      setShowlogin("open");
      setErrorMsg("Invalid username or password.");
    }
  }, []);

  function clickShowLogin() {
    if (!showLogin) {
      setShowlogin("open");
    } else {
      setShowlogin(false);
    }
  }

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
            {props.user ? (
              <div className="p-6 block">
                <a href="/logout">
                  <button
                    className="inline-block text-sm px-4 py-2 leading-none
                    border-2 border-acc
                   hover:bg-acc hover:text-white
                    rounded text-acc 
                    font-header md:mt-4 lg:mt-0"
                  >
                    LOGOUT
                  </button>
                </a>
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
        <div className="flex items-center flex-shrink-0 w-64 pl-3 md:pb-3">
          <img src="https://svgshare.com/i/uZ0.svg" alt="bookfinder logo" />
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
                    href="/readlist"
                    className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
                  >
                    READ LIST
                  </a>
                </div>
                <div className="p-3">
                  <a
                    href="/maybelist"
                    className="block font-header lg:inline-block lg:mt-0  hover:text-prim text-dark"
                  >
                    MAYBE LIST
                  </a>
                </div>
                <div className="p-3">
                  <a
                    href="/notlist"
                    className="block font-header mt-4 lg:inline-block lg:mt-0  hover:text-prim text-dark"
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
        {props.user ? (
          <div className="pr-3 md:block hidden">
            <a href="/logout">
              <button
                className="inline-block text-sm px-4 py-2 leading-none
                    border-2 border-acc
                   hover:bg-acc hover:text-white
                    rounded text-acc 
                    font-header mt-4 lg:mt-0"
              >
                LOGOUT
              </button>
            </a>
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
        <div className="absolute top-2 right-8">
          <button onClick={clickShowLogin} className="text-acc">
            Close
          </button>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-dark font-header sm:text-3xl">
              LOG IN TO FIND YOUR NEXT BOOK
            </h1>

            <p className="mx-auto mt-4 text-dark font-body max-w-md text-center">
              By logging in you will be see whats new and start to choose what
              makes it into your very own{" "}
              <span className="italic">to-read-list.</span>
              <br></br> <span className="font-bold">Happy book hunting!</span>
            </p>

            <form
              method="post"
              action="/login"
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
            >
              <p className="text-center text-lg font-medium">
                Sign in to your account
              </p>

              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>

                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                  />
                </div>
                <p className="text-error font-bold ml-2 mt-1">{errorMsg}</p>
              </div>
              <div className="flex justify-center">
                {" "}
                <button
                  type="submit"
                  className="inline-block text-sm px-8 py-2 leading-none
                bg-dark hover:bg-prim
                rounded text-prim hover:text-white
                font-header mt-4 lg:mt-0"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="text-center text-sm text-dark mt-2 font-bold mx-2">
              No account?{"  "}
              <a className="underline" href="">
                Sign up
              </a>
              {"   "}(not enabled atm)
            </p>
          </div>
        </div>
      </dialog>
    </nav>
  );
}
