import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

// On success redirect the user
//  if error - errors Reducer
// ---Register User---
export const registerUser = (userData, history) => dispatch => {
  // Axios requst to register Database
  axios
    // Api endpoint in routes
    .post("/api/users/register", userData)
    //   If Successful Redirect to history - login
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User - Gets users token
// Takes in userData
export const loginUser = userData => dispatch => {
  // Axios Reqeust
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save Response to localStorage
      const { token } = res.data;
      // Set token to local storage - Only stores Strings
      localStorage.setItem("jwtToken", token);
      //   Sets token to Auth Header
      //   This Token includes the user Information
      setAuthToken(token);
      //   Decodes token to pull out user data
      const decoded = jwt_decode(token);
      //   Set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove Token from local storage
  localStorage.removeItem("jwtToken");
  //   Remove auth Header for future requests
  //   Checks for token in this case must be false to destroy
  setAuthToken(false);
  //   Sets current user to empty object - Authenticated = false
  dispatch(setCurrentUser({}));
};
