import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { API_URL } from "./constants";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import BookHunt from "./Pages/BookHunt";
import ReadList from "./Pages/ReadList";
import MaybeList from "./Pages/MaybeList";
import NotList from "./Pages/NotList";

function App() {
  const [csrfToken, setCsrfToken] = useState("");
  const [hasAccessToken, setHasAccessToken] = useState(false);

  // Fetch CSRF-TOKEN
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        const token = data.csrftoken;
        setCsrfToken(token);
      } catch (error) {
        console.error("Error fetching CSRF token.....:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  // Check and keep track of AccessToken
  useEffect(() => {
    // Update the value of hasAccessToken when the cookie changes
    const checkAccessToken = () => {
      if (!Cookies.get("access_token")) {
        setHasAccessToken(false);
      } else {
        setHasAccessToken(true);
      }
    };
    // Add an event listener to detect changes in the access token cookie
    window.addEventListener("storage", checkAccessToken);

    // Check the initial value of the access token cookie
    checkAccessToken();

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("storage", checkAccessToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="container bg-light">
        <div className="w-full md:max-w-6xl m-auto shadow-2xl">
          <Header
            csrftoken={csrfToken}
            hasAccessToken={hasAccessToken}
            setHasAccessToken={setHasAccessToken}
          />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/bookhunt"
                element={<BookHunt csrfToken={csrfToken} />}
              />
              <Route
                exact
                path="/readlist"
                element={<ReadList csrfToken={csrfToken} />}
              />
              <Route
                exact
                path="/maybelist"
                element={<MaybeList csrfToken={csrfToken} />}
              />
              <Route
                exact
                path="/notlist"
                element={<NotList csrfToken={csrfToken} />}
              />
            </Routes>
          </div>
          <footer className="bg-gray-200 text-center">
            <Footer />
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
