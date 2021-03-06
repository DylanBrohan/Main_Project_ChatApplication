import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Input Groups
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    // Setting state
    this.state = {
      text: "",
      errors: {}
    };
    // Bind states
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // When there is a change in props -
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
    const { postId } = this.props;

    // Inserts this into post
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    // Passes in new post
    this.props.addComment(postId, newComment);
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
          <div className="card-header bg-info text-white">Comment...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to a Post"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};
// Map state from redux store to props in this component
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// Connects to Redux store  & Pulls Action types required
export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
