var React = require("react");
var Footer = require("./Footer.jsx");
var Network = require("./Network.jsx");
var Predictions = require("./Predictions.jsx");

var TubeTracker = React.createClass({
  getInitialState: function () {
    var initialData = this.props.initialData;

    return {
      line: initialData ? initialData.request.line : null,
      station: initialData ? initialData.request.station : null,
    };
  },

  onStationSelect: function (e) {
    if (e.detail.line && e.detail.station) {
      this.setState({
        line: e.detail.line,
        station: e.detail.station,
      });
    }
  },

  componentWillUpdate: function (newProps, newState) {
    var line = newState.line;
    var station = newState.station;

    if (this.state.line !== line || this.state.station !== station) {
      var queryString = "?line=" + line + "&station=" + station;
      window.history.pushState(null, null, queryString);
    }
  },

  componentDidMount: function () {
    window.addEventListener("station-select", this.onStationSelect, false);
  },

  componentWillUnmount: function () {
    window.removeEventListener("station-select", this.onStationSelect, false);
  },

  render: function () {
    return (
      <div className="Layout">
        <div className="Layout-predictions">
          <Predictions
            line={this.state.line}
            station={this.state.station}
            networkData={this.props.networkData}
            initialData={this.props.initialData}
          />
        </div>
        <div className="Layout-network">
          <Network networkData={this.props.networkData} />
        </div>
        <div className="Layout-footer">
          <Footer />
        </div>
      </div>
    );
  },
});

module.exports = TubeTracker;
