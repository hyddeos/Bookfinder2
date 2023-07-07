import React from "react";
import ListBooks from "../components/ListBooks";
import ListType from "../components/ListType";
import Cookies from "js-cookie";
const accessToken = Cookies.get("access_token");

export default function ReadList(props) {
  return (
    <div className="block m-auto my-12">
      {accessToken ? (
        ((
          <ListType
            title={"My Read list"}
            text={"Let´s hope there is some books to marvel and cherish here"}
          />
        ),
        (<ListBooks csrfToken={props.csrfToken} list="read" />))
      ) : (
        <ListType
          title={"Almost my Read list"}
          text={"There is nothing to read here since you are not logged in."}
        />
      )}
    </div>
  );
}
