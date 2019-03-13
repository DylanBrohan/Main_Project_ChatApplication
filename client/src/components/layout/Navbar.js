import React, { Component } from "react";
import { Link } from "react-router-dom";
// Connected to redux to access off state
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    // This clears the profile state just as the user logs out
    this.props.clearCurrentProfile();
    // Destroys Token
    this.props.logoutUser();
  }

  render() {
    // Destructuring
    const { isAuthenticated, user } = this.props.auth;
    // Auth Links setup here
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {/* Public Routes */}
          <Link className="nav-link" to="/feed">
            Post Feed{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Your Dashbaord
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              // Styles of the avatar from gravatar
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You Need a Gravatar connected to your Email"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    // Guest Links set to these Routes
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Chat AI{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {/* IF the user is authenticate = AuthLinks else use Guest */}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
// map store state to props
const mapStateToProps = state => ({
  auth: state.auth
});

// Pull state from store
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
