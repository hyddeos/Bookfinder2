import React from "react";

export default function WelcomeUsps() {
  return (
    <>
      <div className="flex flex-wrap bg-dark">
        <div className="w-full md:w-1/2">
          <div>
            <h3 className="font-header  text-6xl text-prim mt-16 mb-6 ml-8">
              What? How? Why?
            </h3>
            <div className="flex ml-8 my-10">
              <div className="flex-shrink-0 rounded-full bg-prim h-8 w-8"></div>
              <p className="text-light font-ingress font-semibold text-xl pl-4 pr-2">
                Select from already prefilterd books
              </p>
            </div>
            <div className="flex ml-8 my-10">
              <div className="flex-shrink-0 rounded-full bg-prim h-8 w-8 "></div>
              <p className="text-light font-ingress font-semibold text-xl pl-4 pr-2">
                Save books in <span className="italic">Read</span>,{" "}
                <span className="italic">Maybe </span>or
                <span className="italic"> Not</span> to read lists
              </p>
            </div>
            <div className="flex ml-8 my-10">
              <div className="flex-shrink-0 rounded-full bg-prim h-8 w-8"></div>
              <p className="text-light font-ingress font-semibold text-xl pl-4">
                Quicker and more informative overview of the book
              </p>
            </div>
            <div className="flex ml-8 my-10">
              <div className="flex-shrink-0 rounded-full bg-prim h-8 w-8 "></div>
              <p className="text-light font-ingress font-semibold text-xl pl-4 pr-2">
                Never scroll through same book twice
              </p>
            </div>
            <div className="flex ml-8 my-10">
              <div className="flex-shrink-0 rounded-full bg-prim h-8 w-8 "></div>
              <p className="text-light font-ingress font-semibold text-xl pl-4 pr-2">
                Revisit and revalue the lists when ever
              </p>
            </div>
            <div className="flex ml-8 my-10">
              <div className="flex-shrink-0 rounded-full bg-prim h-8 w-8 "></div>
              <p className="text-light font-ingress font-semibold text-xl pl-4 pr-2 pr-2">
                Choose between several diffrent audiobooks providers*
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/3 md:w-1/2 m-auto">
          <img src="https://svgshare.com/i/uZr.svg" alt="knowledge img" />
        </div>
      </div>
      <p className="bg-dark text-light text-right pr-14 pb-10 px-4">
        *Only supports Bookbeat at the moment but more to come.
      </p>
    </>
  );
}
