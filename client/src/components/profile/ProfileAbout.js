import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import axios from "axios";
import TextFieldGroup from "../common/textFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class ProfileAbout extends Component {
  constructor(props) {
    // Initial state
    super(props);
    this.state = {
      userId: "",
      itemId: "",
      title: "",
      recommenderData: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // On submit set the state of the following fields
  onSubmit(e) {
    e.preventDefault();
    // Has All the profile fields
    const profileData = {
      userId: this.state.userId,
      itemId: this.state.itemId,
      title: this.state.title
    };
    // Redux actions are always in the Props
    // this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // ---Get request to the Python Recommendation engine (Server)---
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

    const options = [
      { label: "* Select Your Favourite Language", value: 0 },
      { label: "php", value: "php" },
      { label: "css", value: "css" },
      { label: "html", value: "html" },
      { label: "java", value: "java" },
      { label: "javascript", value: "javascript" },
      { label: "python", value: "python" },
      {
        label: "swift",
        value: "swift"
      },
      {
        label: "basic",
        value: "basic"
      },
      {
        label: "fortran",
        value: "fortran"
      },
      {
        label: "apa",
        value: "apa"
      },
      {
        label: "perl",
        value: "perl"
      },
      {
        label: "postScript",
        value: "postScript"
      },
      {
        label: "rex",
        value: "rex"
      },
      {
        label: "ruby",
        value: "ruby"
      },
      {
        label: "curry",
        value: "curry"
      },
      {
        label: "c",
        value: "c"
      },
      {
        label: "c++",
        value: "c++"
      },
      {
        label: "c#",
        value: "c#"
      },
      {
        label: "cobol",
        value: "cobol"
      },
      {
        label: "D",
        value: "D"
      },
      {
        label: "AppleScript",
        value: "AppleScript"
      },
      {
        label: "curl",
        value: "curl"
      },
      {
        label: "xml",
        value: "xml"
      },
      {
        label: "lava",
        value: "lava"
      },
      {
        label: "IOS",
        value: "IOS"
      },
      {
        label: "Rails",
        value: "Rails"
      },
      {
        label: "SQL",
        value: "SQL"
      },
      {
        label: "Excel",
        value: "Excel"
      },
      {
        label: "JupyterNoteBook",
        value: "JupyterNoteBook"
      },
      {
        label: "Rstudio",
        value: "Rstudio"
      },
      { label: "AndroidStudio", value: "AndroidStudio" }
    ];
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
            <h3 className="text-left text-info col-sm-6">
              Rate Your Favourite Languages
            </h3>
            <TextFieldGroup
              className="col-sm-4"
              input="form-control-md"
              placeholder="User ID"
              name="userId"
              info="Between 1 - 400"
            />{" "}
            <TextFieldGroup
              className="col-sm-4"
              input="form-control-md"
              placeholder="Item ID"
              name="itemId"
              info="1 - 31"
            />{" "}
            <SelectListGroup
              placeholder="* Favourite Language"
              name="status"
              value={this.state.title}
              onChange={this.onChange}
              options={options}
              info="Which is your Favourite"
            />
            <TextFieldGroup
              className="col-sm-4"
              input="form-control-md"
              placeholder="Rating"
              name="skills"
              info="Rate your favourite Language"
            />{" "}
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {this.state.recommenderData}
              </div>
            </div>
            <hr />
            <h3 className="text-left text-info col-sm-4">
              Recommended For You
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
// Prop Checking is.Required
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
