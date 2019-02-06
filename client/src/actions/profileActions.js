// This will hit Api endpoint
// GETS FROM  token profile
import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  // sets the loading state while getting data
  dispatch(setProfileLoading());
  //   Request to Server
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        //   if it finds a profile it passes along the data to the Profile Reducer
        type: GET_PROFILE,
        payload: res.data
      })
    )
    //   if there isnt a profile return empty object
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
// Takes in History for the redirect - With Router
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        // Goes through the Errors Reducer
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Profile Loading
export const setProfileLoading = () => {
  return {
    //   THIS lets the reducer know that its loading
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    //   THIS lets the reducer know that its loading
    // DISPATCHES TO REDUCER
    type: CLEAR_CURRENT_PROFILE
  };
};
// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    // Pass along expData
    .post("/api/profile/experience", expData)
    // If Successfule redirect to dashboard
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    // Pass along expData
    .post("/api/profile/education", eduData)
    // If Successfule redirect to dashboard
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    // Pass along expData
    .get("/api/profile/all")
    // If Successfule redirect to dashboard
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        // Pass in data which is an array of profiles
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    // Pass along expData
    .delete(`/api/profile/experience/${id}`)
    // If Successfule redirect to dashboard
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    // Pass along expData
    .delete(`/api/profile/education/${id}`)
    // If Successfule redirect to dashboard
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Account & Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you Sure?")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          // Sets auth user to nothing
          // SET_CURRENT_USER is located in the authReducer Component
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
