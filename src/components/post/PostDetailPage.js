import { Box, Grid, IconButton, Paper } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getPost,
  saveLikePost,
  saveComment,
  saveViewPost,
} from "./../../redux/actions/postActions";
import CommentsContainer from "./../comments/CommentsContainer";
import Spinner from "./../common/Spinner";

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
    const { postDetails, loading, match, user, saveComment } = this.props;

    return loading || !postDetails ? (
      <Spinner />
    ) : (
      <Grid container>
        <Grid item lg={8}>
          <Paper>
            <img
              alt={postDetails.imageName}
              width="100%"
              src={postDetails.imageId}
            />
          </Paper>
          <Paper>
            <Box>
              <IconButton
                aria-label="like-button"
                onClick={this.handleLikePost}
                style={{ cursor: !user ? "not-allowed" : "cursor" }}
              >
                <ThumbUpIcon color={postDetails.like ? "primary" : "inherit"} />
                {postDetails.likes}
              </IconButton>

              <IconButton
                aria-label="like-button"
                style={{ cursor: "inherit" }}
              >
                <VisibilityIcon /> {postDetails.views}
              </IconButton>
            </Box>
          </Paper>

          <CommentsContainer
            postId={match.params.postId}
            comments={postDetails.comments}
            saveComment={saveComment}
            user={user}
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
  saveComment,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetailPage)
);
