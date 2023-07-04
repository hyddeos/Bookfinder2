import React from "react";

export default function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <div className="flex bg-acc max-w-6xl">
      <div className="flex flex-wrap text-center font-header font-thin justify-evenly text-light m-auto">
        <div className="m-2 opacity-100">
          <a href="/" className="font-bold text-prim">
            Bookfinder
          </a>{" "}
          © {year}
        </div>
        <div className="m-2 opacity-100">
          Made by{" "}
          <a href="https://eshtropy.se/" className="font-bold text-prim">
            Esh
          </a>
        </div>
        <div className="m-2 opacit">
          Visit me at{" "}
          <a
            href="https://github.com/hyddeos/bookfinder"
            className="font-bold text-prim"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
