import Cookies from "js-cookie";

import { API_URL } from "../constants";

export default function HandleLogout(props) {
  fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Logout successful") {
        Cookies.remove("access_token");
        console.log("Logout successful");
      }
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
