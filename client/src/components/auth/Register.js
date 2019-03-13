import React, { Component } from "react";
// Prop Types
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
// connects redux to this component
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../common/textFieldGroup";
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
    // Binds each of the fields to the components state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // When the component runs if they are authenticated go to -> Dashboard route
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  // Update in state ->
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
    // Destructuring errors from state
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your ChatAI Account</p>
              {/* On Submit -> State of the values */}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This Site Uses Gravatar"
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Comfirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
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
