import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  // On Delete inside post -> comment
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    // Destructuring from state
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {/* If the comment is = to the user who posted it => show deletebutton */}
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
// Props required
CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};
// Map state to props from redux store
const mapStateToProps = state => ({
  auth: state.auth
});

// Connection to Store
export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
