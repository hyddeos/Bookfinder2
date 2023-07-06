import React from "react";
import ListBooks from "../components/ListBooks";
import ListType from "../components/ListType";
import Cookies from "js-cookie";
const accessToken = Cookies.get("access_token");

export default function BookHunt(props) {
  return (
    <div className="block m-auto my-12">
      {accessToken ? (
        <ListType
          title={"Book hunting"}
          text={
            "Time to find some books to cherish. Only books not already shelved will be displayed here"
          }
        />
      ) : (
        <ListType
          title={"Book hunting"}
          text={
            "Time to find some books. You are not logged in so your choises won´t be saved."
          }
        />
      )}
      <ListBooks csrfToken={props.csrfToken} />
    </div>
  );
}
