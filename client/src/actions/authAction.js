import axios from "axios";
import { LOGIN_USER } from "./types";

export const loginUser = userToLogin => async dispatch => {
  try {
    const result = await axios.post("/auth/login", userToLogin);
    dispatch({ type: LOGIN_USER, payload: result.data });
    console.log(result.data);
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: LOGIN_USER, payload: error.response.data });
  }
};
