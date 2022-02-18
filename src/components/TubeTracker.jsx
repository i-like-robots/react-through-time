import React from "react";
import Footer from "./Footer.jsx";
import Network from "./Network.jsx";
import Predictions from "./Predictions.jsx";

class TubeTracker extends React.Component {
  constructor(props) {
    super(props);

    const { initialData } = this.props;

    this.state = {
      line: initialData ? initialData.request.lineCode : null,
      station: initialData ? initialData.request.stationCode : null,
    };

    this.onStationSelect = this.onStationSelect.bind(this);
  }

  onStationSelect(e) {
    if (e.detail.line && e.detail.station) {
      this.setState({
        line: e.detail.line,
        station: e.detail.station,
      });
    }
  }

  componentWillUpdate(newProps, newState) {
    const { line, station } = newState;

    if (this.state.line !== line || this.state.station !== station) {
      const queryString = `?line=${line}&station=${station}`;
      window.history.pushState(null, null, queryString);
    }
  }

  componentDidMount() {
    window.addEventListener("station-select", this.onStationSelect, false);
  }

  componentWillUnmount() {
    window.removeEventListener("station-select", this.onStationSelect, false);
  }

  render() {
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
  }
}

export default TubeTracker;
