import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { saveComment } from "./../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import { isLogedIn } from "./../../auth/auth";
export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      isLogedIn: isLogedIn(),
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

  handleSaveComment = async (e) => {
    const { user } = this.props;

    e.preventDefault();
    let comment = {
      text: this.state.text,
      //Missing author
    };
    this.toggleLoading();
    await this.props.saveComment(this.props.postId, comment);

    this.toggleLoading();
    this.setState({
      text: "",
    });
  };

  render() {
    const { text, loading, isLogedIn } = this.state;
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
              onClick={this.handleSaveComment}
            >
              Log In
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  saveComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
