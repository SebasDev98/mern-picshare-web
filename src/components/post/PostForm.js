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
    this.toggleLoading();
    await this.props.savePost(post);

    this.toggleLoading();
    this.setState({
      text: "",
      postImg: undefined,
    });
  };

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState({
      text: value,
    });
  };

  render() {
    const { loading, text, postImg } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        style={{
          marginBottom: 20,
        }}
      >
        <Grid item md={8} lg={8}>
          <TextField
            value={text}
            onChange={this.handleChangeText}
            id="post-text"
            label={"Description"}
            fullWidth
          />
        </Grid>
        <Grid item md={1} lg={1}>
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
              aria-label="upload picture"
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
            {loading ? <CircularProgress size={20} color="secondary" /> : "Add"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

// const mapDispatchToProps = {
//   savePost,
// };

// export default connect(null, mapDispatchToProps)(PostForm);
