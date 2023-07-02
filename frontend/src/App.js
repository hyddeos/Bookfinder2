import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [user, setUser] = React.useState("");
  return (
    <div className="container bg-light">
      <div className="w-full md:max-w-6xl m-auto shadow-2xl">
        <Header user={user} />
        <div className="content"></div>
        <footer className="bg-gray-200 text-center"></footer>
      </div>
    </div>
  );
}

export default App;
