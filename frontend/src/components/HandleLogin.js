import React from "react";
import Cookies from "js-cookie";

import { API_URL } from "../constants";

export default function HandleLogin(props) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const formRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const csrftoken = props.csrftoken;

    const form = event.target;
    const formData = {
      username: form.username.value,
      password: form.password.value,
    };

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Invalid credentials") {
          setErrorMessage("Wrong Username or Password");
          formRef.current.reset();
        } else if (data.message === "Login successful") {
          Cookies.set("access_token", data.access_token);
          Cookies.set("refresh_token", data.refresh_token);
          props.setHasAccessToken(true);
          setErrorMessage("");
          props.setShowlogin(false);
          formRef.current.reset();
        }
      })
      .catch((error) => {
        console.error(error);
        formRef.current.reset();
      });
  };

  return (
    <>
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
            onSubmit={handleSubmit}
            ref={formRef}
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
              {errorMessage && (
                <p className="text-error font-bold ml-2 mt-1">{errorMessage}</p>
              )}
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
            <a className="underline" href="/signup">
              Sign up
            </a>
            {"   "}(not enabled atm)
          </p>
        </div>
      </div>
    </>
  );
}
