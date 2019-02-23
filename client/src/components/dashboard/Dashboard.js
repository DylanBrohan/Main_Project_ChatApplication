import React, { Component } from "react";
import PropTypes from "prop-types";

// Actions
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

// Components
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
class Dashboard extends Component {
  // life cycle method
  componentDidMount() {
    // When the dashboard is loaded this gets called
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    // Profile & loading are coming from the profile state in the profileReducer
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    // If profile is = to null and is loading execute
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Checks if logged in user has a profile
      // From the profile state in the actions
      // If there is a profile display this
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            {/* DashBoard Buttons */}
            <ProfileActions />
            {/* Sends in the array of experiences */}
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // Else display this
        // User is Logged in, has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You need to setup your profile, Please add information</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="h1 display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
