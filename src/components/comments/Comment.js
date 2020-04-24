import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
export default function Comment({ comment }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={comment.authorName} />
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
