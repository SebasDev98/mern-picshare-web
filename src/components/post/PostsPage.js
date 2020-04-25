import React, { Component } from "react";
import { savePost, getPosts } from "./../../redux/actions/postActions";
import { connect } from "react-redux";
import Spinner from "./../common/Spinner";

import Post from "./Post";
import Grid from "@material-ui/core/Grid";
import PostForm from "./PostForm";
class PostsPage extends Component {
  state = { loading: true };
  async componentDidMount() {
    await this.props.getPosts();
    this.setState({ loading: false });
  }

  render() {
    const { posts, user } = this.props;
    const { loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <>
        {user && <PostForm savePost={this.props.savePost} />}
        <Grid container spacing={3} style={{ marginTop: 25 }}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} lg={3} md={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    user: state.user.user,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  savePost,
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
