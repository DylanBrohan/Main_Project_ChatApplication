import React, { Component } from "react";
// Prop Types
import PropTypes from "prop-types";
import classnames from "classnames";

import { withRouter } from "react-router-dom";
// connects redux to this component
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

// Main Register page
class Register extends Component {
  constructor() {
    super();
    // Sets the state
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    // Links each of the fields to the components state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check for an error prop
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  //   Whenever user types, set the state variables
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // any actions is called through props
    // History allows to redirect within the action
    this.props.registerUser(newUser, this.props.history);
  }
  //   <-- Register -->
  render() {
    // If we have errors
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your ChatAI Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames(
                      // Is-invalid class, only if errors.name exists in the state
                      "form-control form-control-lg",
                      {
                        "is-invalid": errors.name
                      }
                    )}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames(
                      // Is-invalid class, only if errors.email exists in the state
                      "form-control form-control-lg",
                      {
                        "is-invalid": errors.email
                      }
                    )}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames(
                      // Is-invalid class, only if errors.password exists in the state
                      "form-control form-control-lg",
                      {
                        "is-invalid": errors.password
                      }
                    )}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />

                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames(
                      // Is-invalid class, only if errors.password exists in the state
                      "form-control form-control-lg",
                      {
                        "is-invalid": errors.password2
                      }
                    )}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Mapping all prop types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// putting auth state inside a property called auth for easy access
const mapStateToProps = state => ({
  // comes from rootReducer
  auth: state.auth,
  errors: state.errors
});
// maps actions in component Register
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
