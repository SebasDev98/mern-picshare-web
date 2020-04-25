import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from "@material-ui/core";

import { red } from "@material-ui/core/colors";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link, useRouteMatch } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  icon: {
    color: `rgba(0,0,0,0.54)`,
  },
}));

export default function Post({ post }) {
  const classes = useStyles();
  let match = useRouteMatch();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label={post.authorName} className={classes.avatar}>
            {post.authorName[0]}
          </Avatar>
        }
        title={post.authorName}
        subheade
      />
      <Link
        to={`${match.path}posts/${post._id}`}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          className={classes.media}
          image={post.imageId}
          title={post.imageId.split("-")[1]}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.text}
          </Typography>
        </CardContent>
      </Link>
      <CardActions style={{ fontSize: "1.5rem" }}>
        <ThumbUpIcon color="primary" /> {post.likes}
        <VisibilityIcon className={classes.icon} /> {post.views}
        <span style={{ marginLeft: 30, fontSize: "1rem" }}>
          {dayjs(post.createdAt).from(dayjs())}
        </span>
      </CardActions>
    </Card>
  );
}
