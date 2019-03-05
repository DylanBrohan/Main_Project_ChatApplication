import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import axios from "axios";

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommenderData: []
    };
  }
  componentDidMount() {
    axios
      .get("/rec")
      .then(res => {
        console.log(res.data);
        this.setState({
          recommenderData: res.data
        });
      })
      // Else give back and error
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //   Destructure from props
    const { profile } = this.props;
    // Get First Name
    const firstName = profile.user.name.trim().split(" ")[0];

    // GetSkill list
    const skill = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      //   Profile About
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span> {firstName}Does Not Have a Bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-left text-info col-sm-4">Languages You Know</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skill}
              </div>
            </div>
            {/* Place here RECOMMENDATION */}
            <h3 className="text-left text-info col-sm-4">
              Recommended For You
            </h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {this.state.recommenderData}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
