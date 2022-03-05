import React from "react";
import Notice from "./Notice.jsx";
import Departures from "./Departures.jsx";

function fetchRequest(url) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(
        `Unexpected response code: ${res.status}, ${res.statusText}`
      );
    }
  });
}

class Predictions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.initialData ? "success" : "welcome",
      predictionData: props.initialData,
    };
  }

  onFetchError(err) {
    this.setState({
      status: "error",
      predictionData: undefined,
    });

    console.error(err);
  }

  onFetchSuccess(data) {
    this.setState({
      status: "success",
      predictionData: data,
    });

    this.resetPoll(this.props.line, this.props.station);
  }

  fetchData(line, station, showLoadingState) {
    this.setState({ status: showLoadingState ? "loading" : "success" });

    const url = `/api/${line}/${station}`;

    fetchRequest(url)
      .then((data) => this.onFetchSuccess(data))
      .catch((err) => this.onFetchError(err));
  }

  resetPoll(line, station) {
    this.poll = setTimeout(
      this.fetchData.bind(this, line, station, false),
      1000 * 30
    );
  }

  componentDidMount() {
    if (this.props.line && this.props.station) {
      this.resetPoll(this.props.line, this.props.station);
    }
  }

  componentWillReceiveProps(newProps) {
    // Only update when line/station changes or new predictions load otherwise the
    // loading notice will be displayed when refreshing current predictions.
    const currentLine =
      this.state.predictionData && this.state.predictionData.request.line;
    const currentStation =
      this.state.predictionData && this.state.predictionData.request.station;
    const fetchNewData =
      newProps.line !== currentLine || newProps.station !== currentStation;

    if (fetchNewData) {
      clearTimeout(this.poll);
      this.fetchData(newProps.line, newProps.station, true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  render() {
    if (this.state.status === "success") {
      return <Departures predictionData={this.state.predictionData} />;
    }

    return <Notice type={this.state.status} />;
  }
}

export default Predictions;
