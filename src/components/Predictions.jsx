var React = require("react");
var Notice = require("./Notice.jsx");
var Departures = require("./Departures.jsx");

function ajaxRequest(url, callback) {
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.onload = function () {
    if (this.status === 200) {
      callback(null, this.responseText);
    } else {
      callback(new Error(this.status), null);
    }
  };

  request.onerror = function () {
    callback(new Error(this.status), null);
  };

  request.send();
}

var Predictions = React.createClass({
  getInitialState: function () {
    return {
      status: this.props.initialData ? "success" : "welcome",
      predictionData: this.props.initialData,
    };
  },

  fetchData: function (line, station) {
    this.setState({ status: "loading" });

    var url = "/api/" + line + "/" + station;

    function callback(err, data) {
      if (err) {
        this.onFetchError(err);
      } else {
        this.onFetchSuccess(data);
      }
    }

    ajaxRequest(url, callback.bind(this));
  },

  onFetchError: function (err) {
    this.setState({
      status: "error",
      predictionData: undefined,
    });

    console.error(err);
  },

  onFetchSuccess: function (data) {
    this.setState({
      status: "success",
      predictionData: JSON.parse(data),
    });
  },

  resetPoll: function (line, station) {
    clearInterval(this.poll);

    this.poll = setInterval(
      this.fetchData.bind(this, line, station),
      1000 * 30
    );
  },

  componentDidMount: function () {
    if (this.props.line && this.props.station) {
      this.resetPoll(this.props.line, this.props.station);
    }
  },

  componentWillUnmount: function () {
    clearInterval(this.poll);
  },

  componentWillReceiveProps: function (newProps) {
    this.fetchData(newProps.line, newProps.station);
    this.resetPoll(newProps.line, newProps.station);
  },

  shouldComponentUpdate: function (newProps, newState) {
    // Only update when line/station changes or new predictions load otherwise the
    // loading notice will be displayed when refreshing current predictions.
    return newState.status !== "loading" || this.props !== newProps;
  },

  render: function () {
    if (this.state.status === "success") {
      return <Departures predictionData={this.state.predictionData} />;
    }

    return <Notice type={this.state.status} />;
  },
});

module.exports = Predictions;
