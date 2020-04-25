import React, { Component } from "react";

import { Container, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PostDetailPage from "./components/post/PostDetailPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/user/LoginPage";
import PostsPage from "./components/post/PostsPage";
import SignUpPage from "./components/user/SignUpPage";
import NavBar from "./components/layout/NavBar";

import { verifyToken } from "./redux/actions/userActions";

import { closeNotification } from "./redux/actions/notificationActions";

import { connect } from "react-redux";

class App extends Component {
  async componentDidMount() {
    await this.props.verifyToken();
  }

  render() {
    const { notification, closeNotification } = this.props;

    return (
      <>
        <Snackbar
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          open={notification.open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={closeNotification}
        >
          <Alert
            variant="filled"
            onClose={closeNotification}
            severity={notification.type}
          >
            <span id="message-id">{notification.message}</span>
          </Alert>
        </Snackbar>
        <Router>
          <NavBar />
          <Container style={{ paddingTop: 20, height: "100%" }}>
            <Switch>
              <Route path="/" exact={true}>
                <PostsPage />
              </Route>
              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/sigin" exact={true}>
                <SignUpPage />
              </Route>
              <Route path="/posts/:postId" exact={true}>
                <PostDetailPage />
              </Route>
            </Switch>
          </Container>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  verifyToken,
  closeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
