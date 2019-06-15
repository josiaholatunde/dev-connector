import axios from "axios";
import { LOGIN_USER, GET_ERRORS } from "./types";

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

export const registerUser = (userToRegister = async dispatch => {
  try {
    const result = await axios.post("/auth/register", userToRegister);
    console.log(result.data);
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
});
