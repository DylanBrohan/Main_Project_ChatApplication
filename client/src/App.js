import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// JWT token Decoder
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

import { setCurrentUser } from "./actions/authActions";

import { logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";
// This checks if user is logged in even when page refresh
// Checks for token
if (localStorage.jwtToken) {
  // set token header Auth
  setAuthToken(localStorage.jwtToken);
  // Decodes Token and gets user Data + Expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Sets User and Is Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for Expired Token
  const currentTime = Date.now() / 1000;
  // Expired value in object
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // Clear Profile
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      // Takes in Store
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <div className="container" />
            <Route exact path="/register" component={Register} />
            <Route exact path="/Login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
