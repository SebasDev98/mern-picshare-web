import React, { Component } from "react";
import Post from "./Post";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import {
  getPost,
  saveLikePost,
  saveViewPost,
} from "./../../redux/actions/postActions";
import { connect } from "react-redux";
import Spinner from "./../common/Spinner";
import Paper from "@material-ui/core/Paper";
import { bindActionCreators } from "redux";
import CommentsContainer from "./../comments/CommentsContainer";
import { Box } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import VisibilityIcon from "@material-ui/icons/Visibility";

class PostDetailPage extends Component {
  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    await this.props.getPost(params.postId);
    await this.props.saveViewPost(params.postId);
  }

  handleLikePost = () => {
    const {
      match: { params },
      postDetails,
      user,
    } = this.props;
    if (!postDetails.like && user) {
      this.props.saveLikePost(params.postId);
    }
  };

  render() {
    const { postDetails, loading, match, user } = this.props;

    return loading || !postDetails ? (
      <Spinner />
    ) : (
      <Grid container>
        <Grid item lg={8}>
          <Paper>
            <img
              width="100%"
              src={`${process.env.REACT_APP_BASE_URL}assets/images/${postDetails.imageId}`}
            />
          </Paper>
          <Paper>
            <Box>
              <IconButton
                aria-label="like this post"
                onClick={this.handleLikePost}
                style={{ cursor: !user ? "not-allowed" : "cursor" }}
              >
                <ThumbUpIcon color={postDetails.like ? "primary" : "inherit"} />{" "}
                {postDetails.likes}
              </IconButton>

              <IconButton
                aria-label="like this post"
                style={{ cursor: "inherit" }}
              >
                <VisibilityIcon /> {postDetails.views}
              </IconButton>
            </Box>
          </Paper>
          {/* <Post post={postDetails} /> */}
          <CommentsContainer
            postId={match.params.postId}
            comments={postDetails.comments}
          />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    postDetails: state.posts.postDetails,
    user: state.user.user,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  getPost,
  saveLikePost,
  saveViewPost,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetailPage)
);
