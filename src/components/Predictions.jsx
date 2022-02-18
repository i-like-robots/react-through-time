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

  fetchData(line, station) {
    this.setState({ status: "loading" });

    const url = `/api/${line}/${station}`;

    fetchRequest(url)
      .then((data) => this.onFetchSuccess(data))
      .catch((err) => this.onFetchError(err));
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
  }

  resetPoll(line, station) {
    clearInterval(this.poll);

    this.poll = setInterval(
      this.fetchData.bind(this, line, station),
      1000 * 30
    );
  }

  componentDidMount() {
    if (this.props.line && this.props.station) {
      this.resetPoll(this.props.line, this.props.station);
    }
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  componentWillReceiveProps(newProps) {
    this.fetchData(newProps.line, newProps.station);
    this.resetPoll(newProps.line, newProps.station);
  }

  shouldComponentUpdate(newProps, newState) {
    // Only update when line/station changes or new predictions load otherwise the
    // loading notice will be displayed when refreshing current predictions.
    return newState.status !== "loading" || this.props !== newProps;
  }

  render() {
    if (this.state.status === "success") {
      return <Departures predictionData={this.state.predictionData} />;
    }

    return <Notice type={this.state.status} />;
  }
}

export default Predictions;
