import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../utils/setAuthToken";

export const loginUser = userToLogin => async dispatch => {
  try {
    const result = await axios.post("/auth/login", userToLogin);
    //Save Token
    const { token } = result.data;
    localStorage.setItem("jwtToken", token);

    setAuthToken(token);

    const decodedToken = jwt_decode(token);

    dispatch({ type: SET_CURRENT_USER, payload: decodedToken });
    console.log(decodedToken);
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const registerUser = (userToRegister, history) => async dispatch => {
  try {
    const result = await axios.post("/auth/register", userToRegister);
    history.push("/login");
    console.log(result.data);
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const logOut = () => async dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};
