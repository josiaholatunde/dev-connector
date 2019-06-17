import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        style={{ margin: "auto", width: "18rem", display: "block" }}
        alt="Loading"
      />
    </div>
  );
}
