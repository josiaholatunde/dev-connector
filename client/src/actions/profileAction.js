import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  PROFILE_LOADING,
  GET_PROFILE
} from "./types";

export const getProfile = () => async dispatch => {
  try {
    dispatch({ type: PROFILE_LOADING });
    const result = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: result.data });
  }
};
