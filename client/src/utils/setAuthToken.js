import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply token if it exists to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //   Delete Auth Header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
