import React, { Component } from "react";
import { connect } from "react-redux";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Avatar,
  CircularProgress,
} from "@material-ui/core";

import { signUp } from "../../redux/actions/userActions";
import { emailValidation } from "./../../utils/validations";
import { withRouter } from "react-router-dom";
const styles = {
  container: {
    marginTop: 9,
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
};
class SignUpPage extends Component {
  state = {
    email: "",
    emailError: false,
    userName: "",
    password: "",
    loading: false,
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleChangeEmail = (e) => {
    const { value } = e.target;

    let emailError = emailValidation(value);

    this.setState({
      email: value,
      emailError,
    });
  };

  toggleLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  handleClickSignUp = async (e) => {
    const { email, password, userName } = this.state;
    e.preventDefault();

    this.toggleLoading();
    const result = await this.props.signUp({
      email,
      password,
      userName,
    });
    if (result.success) this.props.history.push("/");
    else {
      this.toggleLoading();
    }
  };

  render() {
    const { email, password, userName, loading, emailError } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item md={6} lg={6}>
          <Paper>
            <div style={styles.container}>
              <Avatar>
                <LockOutLineIcon />
              </Avatar>
              <Typography component="h1">Sig In</Typography>
              <TextField
                onChange={this.handleChangeInput}
                id="userName"
                label="User Name"
                name="userName"
                variant="outlined"
                value={userName}
                fullWidth
                margin="normal"
              />
              <TextField
                onChange={this.handleChangeEmail}
                type="email"
                id="email"
                error={emailError}
                label="Email"
                name="email"
                variant="outlined"
                value={email}
                helperText={emailError ? "Incorrect Email" : ""}
                fullWidth
                margin="normal"
              />

              <TextField
                onChange={this.handleChangeInput}
                id="password"
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
              />

              <Button
                margin="normal"
                color="primary"
                variant="contained"
                fullWidth
                onClick={this.handleClickSignUp}
              >
                {loading ? (
                  <CircularProgress size={20} style={{ color: "white" }} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  signUp,
};

export default withRouter(connect(null, mapDispatchToProps)(SignUpPage));
