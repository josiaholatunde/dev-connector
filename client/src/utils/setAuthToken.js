import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    console.log("I ran");
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
