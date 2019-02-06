import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Components
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  // When the page runs call getProfiles
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      // If thats true load spinner gif
      profileItems = <Spinner />;
    } else {
      // if there is profiles run else load h4
      if (profiles.length > 0) {
        // Map profiles that are coming through the state
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles Found</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and Connect with Tech Enthusiasts
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
