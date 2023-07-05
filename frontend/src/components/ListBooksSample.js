import React from "react";
import { API_URL } from "../constants";

export default function ListBooksSample() {
  const [books, setBooks] = React.useState([]);
  const [readThis, setReadThis] = React.useState([]);
  const [readMaybe, setReadMaybe] = React.useState([]);
  const [readNot, setReadNot] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_URL}/samplebooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dataaaaa", data);
        const jsondata = JSON.parse(data.books);
        setBooks(jsondata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log("books", books);

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
  }

  return (
    <div className="content mb-7 bg-light">
      <div className="bg-gradient-to-b from-dark to-light h-18">
        <h3 className="text-prim font-header text-8xl text-center ">
          HERE´S HOW IT WORKS
        </h3>
        <h5 className="text-dark font-ingress font-bold text-center">
          Well, on these sample books, your preferences won't be saved, but at
          least you will get an idea of how it will work. For the best experince
          you should use a desktop device.
        </h5>
      </div>
      <div className="max-w-6xl mx-2 ">
        <div className="flex justify-center"></div>
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
                    alt="cover image for the book"
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
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
