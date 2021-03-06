import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// Field Components
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// Redux
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  // Initial state
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    // Binding function to state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  // When there is a update it props ->
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // Experience Object state
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.decription
    };
    // Call props add experience
    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // Changed Disabled state & Current state
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    //   --Curley Braces pulls errors out--
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {/* Route link to dashboard(Public link) */}
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>

              <p className="lead text-center">
                Add a Job / Position (Past - Present)
              </p>
              <small className="d-block.pb-3">* = Required Fields</small>
              <form onSubmit={this.onSubmit}>
                {/* Components called -> */}
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                {/* Setting values for each state within form */}
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  //   If it is true to will be disabled
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                  <TextAreaFieldGroup
                    placeholder="Job Description"
                    name="decription"
                    value={this.state.decription}
                    onChange={this.onChange}
                    error={errors.decription}
                    info="Tell us about the position"
                  />
                  {/* On submit -> values into state */}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Proptypes that are required
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// Maps the state to the props in the component from the store
const mapStateToProps = state => ({
  // Brings in state from reducer
  profile: state.profile,
  errors: state.errors
});

// connects to redux
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
