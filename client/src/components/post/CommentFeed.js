import React, { Component } from "react";
import PropTypes from "prop-types";
// Comment item takes care of displaying each comment
import CommentItem from "./CommentItem";
class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    // CommentFeed takes care of mapping through the comments
    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}
// Required Props
CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
