import React from "react";
import WelcomeHero from "../components/WelcomeHero";
import WelcomeUsps from "../components/WelcomeUsps";
import ListBooksSample from "../components/ListBooksSample";

export default function Home(props) {
  return (
    <div className="block m-auto my-12">
      <WelcomeHero />
      <WelcomeUsps />
    </div>
  );
}
