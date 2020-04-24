import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function Spinner({ children, loading }) {
  return (
    <>
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </div>
      )
    </>
  );
}
