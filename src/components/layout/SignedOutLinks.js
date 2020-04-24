import React from "react";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function SignedOutLinks() {
  return (
    <>
      <Link to="/sigin" style={{ textDecoration: "none", marginRight: 5 }}>
        <Button variant="contained" color="secondary">
          Sign Up
        </Button>
      </Link>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Login
        </Button>
      </Link>
    </>
  );
}
