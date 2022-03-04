var React = require("react");
var Notice = require("./Notice.jsx");
var Departures = require("./Departures.jsx");

function ajaxRequest(url, callback) {
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.onload = function () {
    if (this.status === 200) {
      try {
        var json = JSON.parse(this.responseText);
        callback(null, json);
      } catch (err) {
        callback(err, null);
      }
    } else {
      callback(new Error(this.status), null);
    }
  };

  request.onerror = function (err) {
    callback(err, null);
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
      predictionData: data,
    });
  },

  fetchData: function (line, station) {
    // Only update when line/station changes or new predictions load otherwise the
    // loading notice will be displayed when refreshing current predictions.
    var currentLine =
      this.state.predictionData && this.state.predictionData.request.line;
    var currentStation =
      this.state.predictionData && this.state.predictionData.request.station;
    var showLoading = line !== currentLine || station !== currentStation;

    this.setState({ status: showLoading ? "loading" : "success" });

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

  render: function () {
    if (this.state.status === "success") {
      return <Departures predictionData={this.state.predictionData} />;
    }

    return <Notice type={this.state.status} />;
  },
});

module.exports = Predictions;
