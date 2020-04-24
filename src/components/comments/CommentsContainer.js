import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Comment from "./Comment";
import { withRouter } from "react-router";
import CommentForm from "./CommentForm";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
export class CommentsContainer extends Component {
  render() {
    const { comments, postId } = this.props;

    return (
      <div>
        <CommentForm postId={postId} />
        <List>
          {comments.map((comment) => (
            <div key={comment._id}>
              <Divider
                variant="inset"
                component="li"
                style={{ marginBottom: 5, marginTop: 5 }}
              />
              <Comment comment={comment} />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
);
