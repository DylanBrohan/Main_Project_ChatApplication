import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  // When this component runs & is authenticated redirect to dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      //  <!-- Landing -->
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Chat AI</h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get
                  Recommendations on what Technolgies you should pursue.
                </p>
                <hr />
                {/* Public Routes -> */}
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>

                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Proptypes required in this component
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
// Map state to props from reduc store
const mapStateToProps = state => ({
  auth: state.auth
});

// Connection to Redux store
export default connect(mapStateToProps)(Landing);
