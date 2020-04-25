import React, { Component } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

import { withRouter } from "react-router-dom";
export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
    };
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  toggleLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  handleGoToLogin = () => {
    this.props.history.push("/login");
  };

  handleSaveComment = async (e) => {
    e.preventDefault();
    let comment = {
      text: this.state.text,
    };
    this.toggleLoading();
    const result = await this.props.saveComment(this.props.postId, comment);
    this.toggleLoading();
    if (result.success) {
      this.setState({
        text: "",
      });
    }
  };

  render() {
    const { text } = this.state;
    const { isLogedIn } = this.props;
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
            id="standard-basic"
            label={isLogedIn ? "Comment" : "Log In To Comment"}
            fullWidth
          />
        </Grid>
        <Grid item md={2} lg={2}>
          {isLogedIn ? (
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: 5 }}
              onClick={this.handleSaveComment}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: 5 }}
              onClick={this.handleGoToLogin}
            >
              Log In
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(CommentForm);
