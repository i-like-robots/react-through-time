var React = require("react");
var ReactDOM = require("react-dom");
var TubeTracker = require("../components/TubeTracker.jsx");

var data = JSON.parse(document.getElementById("initialData").innerHTML);

ReactDOM.render(
  React.createElement(TubeTracker, data),
  document.getElementById("app")
);
