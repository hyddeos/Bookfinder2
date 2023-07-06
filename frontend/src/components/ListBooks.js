import React from "react";
import Cookies from "js-cookie";
import { API_URL } from "../constants";

import Pagination from "../components/Pagination";

export default function Home(props) {
  const [books, setBooks] = React.useState([]);
  const [pages, setPages] = React.useState([]);
  const [totalBooks, setTotalBooks] = React.useState("");
  const [readThis, setReadThis] = React.useState([]);
  const [readMaybe, setReadMaybe] = React.useState([]);
  const [readNot, setReadNot] = React.useState([]);
  const accessToken = Cookies.get("access_token");

  React.useEffect(() => {
    const url = new URL(`${API_URL}/browse`);
    const params = new URLSearchParams(window.location.search);
    url.search = new URLSearchParams(params).toString();

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": props.csrfToken,
    };

    if (accessToken) {
      headers["accesstoken"] = accessToken;
    }

    fetch(url, {
      method: "POST",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
        setPages(data.pages);
        setTotalBooks(data.total_books);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function updateBook(key, list) {
    if (accessToken) {
      const data = {
        readList: list,
        key: key,
      };
      fetch(`${API_URL}/bookaction`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": props.csrfToken,
          accesstoken: accessToken,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log("OK");
          } else {
            console.log("not Ok");
          }
        })
        .catch((error) => {
          console.log("some error", error);
        });
    }
  }

  function handleClick(key, list) {
    // Check if key already added
    if (readThis.includes(key)) {
      setReadThis((prevReadThis) =>
        prevReadThis.filter((item) => item !== key)
      );
    } else if (readMaybe.includes(key)) {
      setReadMaybe((prevReadMaybe) =>
        prevReadMaybe.filter((item) => item !== key)
      );
    } else if (readNot.includes(key)) {
      setReadNot((prevReadNot) => prevReadNot.filter((item) => item !== key));
    } else {
      // Add key to right Read-type
      if (list === "read") {
        setReadThis((prevReadThis) => [...prevReadThis, key]);
      } else if (list === "maybe") {
        setReadMaybe((prevReadMaybe) => [...prevReadMaybe, key]);
      } else if (list === "not") {
        setReadNot((prevReadNot) => [...prevReadNot, key]);
      }
    }
    updateBook(key, list);
  }

  return (
    <div className="content mb-7 bg-light">
      <div className="max-w-6xl mx-2">
        <div className="flex justify-center">
          <Pagination pages={pages} total={totalBooks} />
        </div>
        {books.map((book) => (
          <div key={book.pk} className="my-4 ">
            <div className="flex h-56 md:max-h-60 border-t-4 border-l-4 border-r-4 border-acc rounded-t-xl bg-white overflow-hidden">
              <div className="max-w-6xl object-scale-down bg-prim w-full md:w-1/5">
                <a
                  href={book.fields.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={book.fields.cover}
                    alt="cover for the book"
                    className="object-scale-down h-56 md:p-2 "
                  />
                </a>
              </div>
              <div className="hidden md:block w-1/5 p-3 bg-prim">
                <div className="pt-1">
                  <a
                    href={book.fields.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h2 className="font-header  text-dark">
                      {book.fields.title}
                    </h2>
                  </a>
                </div>
                <div>
                  <h2 className="font-ingress text-dark py-4">
                    {book.fields.author}
                  </h2>
                </div>
                <div>
                  <h2 className="font-ingress text-dark">
                    {book.fields.publisher}
                  </h2>
                </div>
                <div>
                  <h2 className="font-ingress text-dark">
                    {book.fields.published.substring(0, 10)}
                  </h2>
                </div>
              </div>
              <div className="w-full md:w-7/12 p-3 text-clip overflow-y-auto">
                <p className="text-body">{book.fields.summary}</p>
              </div>
              <div className="flex flex-wrap w-1/12">
                <div
                  onClick={() => handleClick(book.pk, "read")}
                  className={`bg-succes h-1/3 w-full text-center grid place-items-center hover:bg-prim cursor-pointer ${
                    readNot.includes(book.pk) || readMaybe.includes(book.pk)
                      ? "hidden"
                      : readThis.includes(book.pk) && "h-full"
                  }`}
                >
                  <span className="material-symbols-outlined text-white text-4xl">
                    thumb_up
                  </span>
                </div>
                <div
                  onClick={() => handleClick(book.pk, "maybe")}
                  className={`bg-light_blue h-1/3 w-full text-center grid place-items-center hover:bg-prim cursor-pointer ${
                    readThis.includes(book.pk) || readNot.includes(book.pk)
                      ? "hidden"
                      : readMaybe.includes(book.pk) && "h-full"
                  }`}
                >
                  <span className="material-symbols-outlined text-white text-4xl">
                    thumbs_up_down
                  </span>
                </div>
                <div
                  onClick={() => handleClick(book.pk, "not")}
                  className={`bg-error h-1/3 w-full text-center grid place-items-center hover:bg-prim cursor-pointer ${
                    readThis.includes(book.pk) || readMaybe.includes(book.pk)
                      ? "hidden"
                      : readNot.includes(book.pk) && "h-full"
                  }`}
                >
                  <span className="material-symbols-outlined text-white text-4xl ">
                    thumb_down
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-acc rounded-b-xl p-1 px-3">
              <p className="text-white ">
                Genres:{" "}
                <span className="font-ingress font-medium">
                  {book.fields.genres}
                </span>
              </p>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Pagination pages={pages} total={totalBooks} />
        </div>
      </div>
    </div>
  );
}
