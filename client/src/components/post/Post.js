import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
// PostAction
import { getPost } from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  // Call the action from post action
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    // IF there is no post activate Spinner Component
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
      // Else display content
    } else {
      postContent = (
        <div>
          {/* Displaying post content by its corresponding Id */}
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Public Route */}
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// Maps state  from store to props
const mapStateToProps = state => ({
  post: state.post
});
// Connection to Redux store
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
