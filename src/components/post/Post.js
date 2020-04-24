import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link, useRouteMatch } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";

// import MoreVertIcon from "@material-ui/icons/MoreVert";

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
}));

export default function Post({ post }) {
  const classes = useStyles();
  let match = useRouteMatch();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
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
          image={`${process.env.REACT_APP_BASE_URL}assets/images/${post.imageId}`}
          title={post.imageId.split("-")[1]}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.text}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="like this post">
          <ThumbUpIcon /> {post.likes}
        </IconButton>

        <IconButton aria-label="like this post">
          <VisibilityIcon /> {post.views}
        </IconButton>

        {dayjs(post.createdAt).from(dayjs())}
      </CardActions>
    </Card>
  );
}
