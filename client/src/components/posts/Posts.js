import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// PostComponents
import PostFeed from "./PostFeed";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    // Gets Posts
    this.props.getPosts();
  }

  render() {
    //   Pull out from Post state in props -
    const { posts, loading } = this.props.post;
    let postContent;
    // If  there is no post call spinner Component
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      //   Passing into post Feed component
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
