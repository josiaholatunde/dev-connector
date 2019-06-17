import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE } from "./types";

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
