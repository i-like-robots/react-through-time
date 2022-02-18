const React = require("react");
const ReactDOM = require("react-dom");
const TubeTracker = require("../components/TubeTracker.jsx");

const data = JSON.parse(document.getElementById("initialData").innerHTML);

ReactDOM.render(
  React.createElement(TubeTracker, data),
  document.getElementById("app")
);
