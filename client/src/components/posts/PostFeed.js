import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    // Destructure take post out of props
    const { posts } = this.props;
    // Mapping through them and then calling up PostItem Component
    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}
PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
