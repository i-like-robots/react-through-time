import React from "react";
import ReactDOM from "react-dom";
import TubeTracker from "../components/TubeTracker.jsx";

const data = JSON.parse(document.getElementById("initialData").innerHTML);

ReactDOM.hydrate(
  React.createElement(TubeTracker, data),
  document.getElementById("app")
);
