import Cookies from "js-cookie";
import { API_URL } from "../constants";

export default function UpdateServices(props) {
  const accessToken = Cookies.get("access_token");
  console.log("Started updating");

  fetch(`${API_URL}/updateservices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": props.csrftoken,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
