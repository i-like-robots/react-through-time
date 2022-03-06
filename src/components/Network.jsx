var React = require("react");
var NetworkLine = require("./NetworkLine.jsx");

var Network = React.createClass({
  render: function () {
    var networkData = this.props.networkData;
    var lineCodes = Object.keys(networkData.lines);

    var lines = lineCodes.map(function (line) {
      return <NetworkLine networkData={networkData} line={line} key={line} />;
    });

    return <div className="Network">{lines}</div>;
  },
});

module.exports = Network;
