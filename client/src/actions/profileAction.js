import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

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
export const getProfiles = () => async dispatch => {
  let result;
  try {
    dispatch({ type: PROFILE_LOADING });
    result = await axios.get("/api/profile/all");
    dispatch({ type: GET_PROFILES, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: null });
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

export const deleteAccount = () => async dispatch => {
  try {
    const result = axios.delete("/api/profile");
    dispatch({ type: SET_CURRENT_USER, payload: {} });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const addExperience = (newExp, history) => async dispatch => {
  try {
    const result = await axios.post("/api/profile/experience", newExp);
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const addEducation = (newEdu, history) => async dispatch => {
  try {
    const result = await axios.post("/api/profile/education", newEdu);
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const result = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({ type: GET_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const deleteEducation = id => async dispatch => {
  try {
    const result = await axios.delete(`/api/profile/education/${id}`);
    dispatch({ type: GET_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
