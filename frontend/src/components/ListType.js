import React from "react";

export default function ListType(props) {
  return (
    <div className="my-8 text-center">
      <h2 className="font-header text-dark text-3xl">{props.title}</h2>
      <p className="text-dark font-ingress">{props.text}</p>
    </div>
  );
}
