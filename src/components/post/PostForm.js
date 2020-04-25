import React, { Component } from "react";

import {
  CircularProgress,
  IconButton,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
export default class PostForm extends Component {
  state = {
    loading: false,
    text: "",
    postImg: undefined,
    postTextErrorMessage: "",
    postTextError: false,
  };

  validateText = () => {
    let { text, postTextErrorMessage, postTextError } = this.state;

    if (text.length === 0) {
      postTextError = true;
      postTextErrorMessage = "Post's description is required";
    } else {
      postTextError = false;
      postTextErrorMessage = "";
    }

    this.setState({
      postTextError,
      postTextErrorMessage,
    });

    return !postTextError;
  };

  handleChangeImage = (e) => {
    const file = Array.from(e.target.files)[0];
    this.setState({ postImg: file });
  };

  toggleLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  handleSavePost = async (e) => {
    e.preventDefault();
    const { text, postImg } = this.state;
    const post = {
      text,
      postImg,
    };
    if (this.validateText()) {
      this.toggleLoading();
      const result = await this.props.savePost(post);

      if (result.success) {
        this.setState({
          text: "",
          postImg: undefined,
        });
      }
      this.toggleLoading();
    }
  };

  handleChangeText = (e) => {
    const { value } = e.target;

    this.validateText();
    this.setState({
      text: value,
    });
  };

  render() {
    const {
      loading,
      text,
      postImg,
      postTextError,
      postTextErrorMessage,
    } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{
          marginBottom: 20,
        }}
      >
        <Grid item md={7} lg={7}>
          <TextField
            value={text}
            required={true}
            onChange={this.handleChangeText}
            error={postTextError}
            helperText={postTextErrorMessage}
            id="post-text"
            label={"Description"}
            fullWidth
          />
        </Grid>
        <Grid item md={2} lg={2}>
          <input
            onChange={this.handleChangeImage}
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: "none" }}
            id="post-img-file"
            type="file"
          />

          <label htmlFor="post-img-file">
            <IconButton
              color="primary"
              aria-label="upload image"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            {postImg && postImg.name}
          </label>
        </Grid>
        <Grid item md={2} lg={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 5 }}
            onClick={this.handleSavePost}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              "Add"
            )}
          </Button>
        </Grid>
      </Grid>
    );
  }
}
