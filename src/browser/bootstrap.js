var React = require("react");
var TubeTracker = require("../components/TubeTracker.jsx");

var data = JSON.parse(document.getElementById("initialData").innerHTML);

React.render(
  React.createElement(TubeTracker, data),
  document.getElementById("app")
);
