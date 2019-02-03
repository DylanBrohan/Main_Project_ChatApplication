// This will hit Api endpoint
// GETS FROM  token profile

import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  //   GET_ERRORS,
  CLEAR_CURRENT_PROFILE
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
