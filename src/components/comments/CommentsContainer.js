import React, { Component } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Divider, List } from "@material-ui/core";
export class CommentsContainer extends Component {
  render() {
    const { comments, postId, saveComment, user } = this.props;

    return (
      <div>
        <CommentForm
          saveComment={saveComment}
          isLogedIn={user ? true : false}
          postId={postId}
        />
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

export default CommentsContainer;
