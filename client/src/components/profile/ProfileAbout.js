import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import axios from "axios";
import TextFieldGroup from "../common/textFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
// Notify Components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ProfileAbout extends Component {
  notify = () => {
    toast.info("Calculating Recommendation.... Please Wait a Moment....", {
      position: toast.POSITION.TOP_RIGHT,
      position: "top-right",
      autoClose: 100000,
      hideProgressBar: false,
      rtl: false,
      pauseOnVisibilityChange: false
    });
  };

  constructor(props) {
    // Initial states
    super(props);
    this.state = {
      // userId: "",
      itemId: "",
      title: "",
      rating: "",
      recommenderData: [],
      recommenderOutput: []
    };
    // Binding states
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // On submit set the state of the following fields
  onSubmit(e) {
    e.preventDefault();
    // Has All the profile fields
    const profileData = {
      // userId: this.state.userId,
      itemId: this.state.itemId,
      title: this.state.title,
      rating: this.state.rating
    };
    // Inserts Data in recommendation Engine Collection
    axios
      .post("/api/recommender/recommender", profileData)
      // Get Request which runs the child_process request - running the engine
      .then(res => {
        axios
          .get("/rec")
          .then(res => {
            // console.log(res.data);
            this.setState({
              recommenderOutput: res.data
            });
          })
          // Else give back and error
          .catch(err => {
            // console.log(err);
          });
      })
      // Else give back and error
      .catch(err => {
        // console.log(err);
      });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {}
  render() {
    //   Destructure from props
    const { profile } = this.props;
    // Get First Name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Get --Skill list--
    const skill = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    // ---Labels for recommendation Engine inputs---
    const options = [
      { label: "* Select Your Favourite Language", value: 0 },
      { label: "1: php", value: "php" },
      { label: "2: css", value: "css" },
      { label: "3: html", value: "html" },
      { label: "4: java", value: "java" },
      { label: "5: javascript", value: "javascript" },
      { label: "6: python", value: "python" },
      {
        label: "7: swift",
        value: "swift"
      },
      {
        label: "8: basic",
        value: "basic"
      },
      {
        label: "9: fortran",
        value: "fortran"
      },
      {
        label: "10: apa",
        value: "apa"
      },
      {
        label: "11: perl",
        value: "perl"
      },
      {
        label: "12: postScript",
        value: "postScript"
      },
      {
        label: "13: rex",
        value: "rex"
      },
      {
        label: "14: ruby",
        value: "ruby"
      },
      {
        label: "15: curry",
        value: "curry"
      },
      {
        label: "16: c",
        value: "c"
      },
      {
        label: "17: c++",
        value: "c++"
      },
      {
        label: "18: c#",
        value: "c#"
      },
      {
        label: "19: cobol",
        value: "cobol"
      },
      {
        label: "20: D",
        value: "D"
      },
      {
        label: "21: AppleScript",
        value: "AppleScript"
      },
      {
        label: "22: curl",
        value: "curl"
      },
      {
        label: "23: xml",
        value: "xml"
      },
      {
        label: "24: lava",
        value: "lava"
      },
      {
        label: "25: IOS",
        value: "IOS"
      },
      {
        label: "26: Rails",
        value: "Rails"
      },
      {
        label: "27: SQL",
        value: "SQL"
      },
      {
        label: "28: Excel",
        value: "Excel"
      },
      {
        label: "29: JupyterNoteBook",
        value: "JupyterNoteBook"
      },
      {
        label: "30: Rstudio",
        value: "Rstudio"
      },
      { label: "31: AndroidStudio", value: "AndroidStudio" }
    ];

    // Destructering into an Array of objects
    const objectValue = this.state.recommenderData;
    const arrayObject = Object.values(objectValue);

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
            <h3 className="text-left text-info col-sm-6">
              Rate Your Favourite Languages
            </h3>
            <div>
              {/* On Submit - this state */}
              <form onSubmit={this.onSubmit}>
                {/* <TextFieldGroup
                  className="col-sm-4"
                  input="form-control-md"
                  placeholder="User ID"
                  name="userId"
                  info="Between 1 - 400"
                  value={this.state.userId}
                  onChange={this.onChange}
                />{" "} */}
                <SelectListGroup
                  placeholder="* Favourite Language"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  options={options}
                  info="Which is your Favourite Languages?"
                />
                <TextFieldGroup
                  className="col-sm-4"
                  input="form-control-md"
                  placeholder="Language Tag"
                  name="itemId"
                  info="*1 - 31, eg( 1: PHP, Tag beside Language Name)*"
                  value={this.state.itemId}
                  onChange={this.onChange}
                />{" "}
                <TextFieldGroup
                  className="col-sm-4"
                  input="form-control-md"
                  placeholder="Rating"
                  name="rating"
                  info="Rate your favourite Language 1-5"
                  value={this.state.rating}
                  onChange={this.onChange}
                />{" "}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                  onClick={this.notify}
                />
                {/* Notification */}
                <ToastContainer
                  position="top-right"
                  autoClose={10000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange={false}
                  draggable
                  pauseOnHover
                />
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center" />
                </div>
                <hr />
                <h3 className="text-left text-info col-sm-4">
                  Recommended For You
                </h3>{" "}
                {/* ID pulling from state */}
                {arrayObject}
                {this.state.recommenderOutput}
              </form>
            </div>
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
