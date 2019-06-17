import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE, GET_ERRORS } from "./types";

export const getProfile = () => async dispatch => {
  let result;
  try {
    dispatch({ type: PROFILE_LOADING });
    result = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};
export const createProfile = (newProfile, history) => async dispatch => {
  try {
    const createdProfile = await axios.post("/api/profile", newProfile);
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
