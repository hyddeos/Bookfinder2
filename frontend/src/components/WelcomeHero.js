import React from "react";

export default function WelcomeHero(props) {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-2/3 bg-prim py-4">
        <h2 className="font-header text-left text-dark text-3xl px-4  ">
          WELCOME <span className="text-succes italic">YOU</span>
        </h2>
        <h3 className="font-header text-dark text-8xl text-left px-4">
          <span className="">LOVER </span>
          <span className="font-ingress italic text-4xl">of</span>
        </h3>
        <h3 className="font-header text-dark text-5xl md:text-8xl text-left md:text-center px-4">
          <span className="text-acc">KNOWLEDGE</span>
        </h3>
        <h3 className="font-header text-dark text-6xl md:text-8xl text-left md:text-right px-4">
          <span className="font-ingress italic text-4xl">and </span>
          <span> CURIOSITY </span>
        </h3>
        <div className="block md:flex">
          <div className="text-dark w-full md:w-1/2">
            <h5 className="text-2xl font-header mt-4 mx-4  px-3 border-acc border-l-4">
              This is for you who...
            </h5>
            <p className="text-2xl font-igress mx-4 px-4">
              Have a passion for listening to{" "}
              <span className="font-semibold">audiobooks</span> with a
              <span className="font-semibold"> philosophical</span> and{" "}
              <span className="font-semibold">scientific</span> inclination.
            </p>
            <p className="font-body text-base mt-4 mx-4 px-4">
              Bookfinder is here to assist you by filtering out all the
              <span className="italic"> get-rich-quick</span> books,{" "}
              <span className="italic">self-help</span> books, and other
              nonsensical books.<br></br>
              <br></br> Here we try to help you find books that go beyond
              surface-level content and provide depth and substance. The audio
              services that are inundated with books focused solely on
              instrumental value, we believe in the power of knowledge for its
              intrinsic worth.
            </p>
          </div>
          <div className="text-dark w-full md:w-1/2">
            <img src="https://svgshare.com/i/uZ2.svg" alt="book" />
            <p className="font-body text-base mx-4 px-4">
              Our mission is to you uncover these hidden gems. For instance, out
              of approximately <span className="font-semibold">10,000</span>{" "}
              books scanned in the factual category, only{" "}
              <span className="font-semibold">1,000</span> make it through our
              selection process.<br></br>
              <br></br> Let´s be clear our algorithm might not be perfect, and
              it's possible that some truly great books may slip through the
              cracks but if you are like us you wont think twice about going
              back and scrolling through hundres of miss categoriesed books
              about <span className="italic">diets</span> or{" "}
              <span className="italic">songs to sing to your dog...</span>.{" "}
              <br></br>
              <br></br>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 pb-10  bg-acc">
        <div className="mt-12">
          <img src="https://svgshare.com/i/uZp.svg" alt="bookfinder logo" />
          <h4 className="font-ingress text-xl italic tracking-wide text-light text-center px-2">
            Your beam of light towards knowledge
          </h4>
        </div>
        <div className="">
          <img
            className="mt-12 pl-4"
            src="https://svgshare.com/i/uZ5.svg"
            alt="Book Lover"
          />
        </div>
        <div>
          <p className="text-ingress text-light text-xl px-8 py-3">
            Create an account and start to fill up your{" "}
            <span className="italic">to-read-list</span> with the most
            intressing books the <span className="font-bold">science</span>,{" "}
            <span className="font-bold">psychology</span> and{" "}
            <span className="font-bold">philosophy</span> genre from{" "}
            <span className="font-semibold">your</span> audiobook provider in no
            time!
          </p>
          <div className="flex  justify-center">
            <a href="/signup">
              <button
                className="inline-block text-sm px-4 leading-none
          bg-prim hover:bg-acc
          rounded-lg text-white h-20
          font-header mt-4 lg:mt-0 border-acc hover:border-prim border-4"
              >
                CREATE ACCOUNT
              </button>
            </a>
          </div>
          <p className="text-light text-center text-body">
            Registration is not yet opened
          </p>
        </div>
      </div>
    </div>
  );
}
