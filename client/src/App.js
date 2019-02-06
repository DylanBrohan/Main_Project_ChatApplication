import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// JWT token Decoder
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";
// Profile Actions
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
// Profile Components
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

// Private Route Component
import PrivateRoute from "./components/common/PrivateRoute";

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
    store.dispatch(clearCurrentProfile());
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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            {/* Switch allows to redirect when logout is clicked */}

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
