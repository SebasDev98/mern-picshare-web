import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import SignedinLinks from "./SignedInLinks";
import { signOut } from "./../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  link: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClickSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            className={classes.link}
            style={{ textDecoration: "none", marginRight: 5, color: "white" }}
          >
            <Typography variant="h6">PicShare</Typography>
          </Link>

          {user ? (
            <SignedinLinks user={user} signOut={handleClickSignOut} />
          ) : (
            <>
              <Link
                to="/sigin"
                style={{ textDecoration: "none", marginRight: 5 }}
              >
                <Button variant="contained" color="secondary">
                  Sig In
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  Login
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
