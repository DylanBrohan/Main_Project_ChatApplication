import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
class PostForm extends Component {
  constructor(props) {
    super(props);
    // Setting  initial state
    this.state = {
      text: "",
      errors: {}
    };
    // Binding to state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // whEN there is a change in state update -
  componentWillReceiveProps(newProps) {
    //   error checking
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // Get user from Auth by destructing
    const { user } = this.props.auth;
    // Inserts this into post
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    // Passes in new post
    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
// Prop Types required in this component
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Map state to props from Redux
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// Connection to Redux Storee
export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
