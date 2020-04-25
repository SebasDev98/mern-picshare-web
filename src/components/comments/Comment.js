import React from "react";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
export default function Comment({ comment }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          aria-label={comment.authorName}
          style={{ backgroundColor: "#f44336" }}
        >
          {comment.authorName[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment.authorName}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {comment.text}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
