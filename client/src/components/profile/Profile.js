// Component for the container for the header about & Credentials etc.
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// All Sub Components of Profile
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
// import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  // When the Component Runs ->
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  // When theres a change in state this will run-->
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      // IF they are true redirect
      this.props.history.push("/not-found");
    }
  }
  render() {
    //   Checks
    // Using destructuring to take out the profile from state
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          {/* Getting the data from this component */}
          {/* passes in properties from profile to the sub components */}
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Displays Profile Content */}
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Type Checking
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

// Mapping state to props from store
const mapStateToProps = state => ({
  profile: state.profile
});

// Connection to Redux Store
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
