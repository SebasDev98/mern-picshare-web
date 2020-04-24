import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper, Button, Avatar, CircularProgress } from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import { login } from "./../../auth/auth";
import { emailValidation } from "./../../utils/validations";
import * as userActions from "./../../redux/actions/userActions";
import { bindActionCreators } from "redux";
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

class LoginPage extends Component {
  state = {
    email: "",
    emailError: false,
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

  handleClickLogin = async (e) => {
    const { email, password } = this.state;
    e.preventDefault();

    this.toggleLoading();
    const result = await this.props.actions.login({ email, password });
    if (result.success) this.props.history.push("/");
    else {
      this.toggleLoading();
    }
  };

  render() {
    const { email, password, loading, emailError } = this.state;
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
              <Typography component="h1">Log In</Typography>
              <TextField
                onChange={this.handleChangeEmail}
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                value={email}
                error={emailError}
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
                onClick={this.handleClickLogin}
              >
                {loading ? (
                  <CircularProgress size={20} style={{ color: "white" }} />
                ) : (
                  "Log In"
                )}
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));
