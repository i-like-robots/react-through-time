import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import Network from "./Network.jsx";
import Predictions from "./Predictions.jsx";

function TubeTracker(props) {
  const [state, setState] = useState({
    line: props.initialData?.request.line || null,
    station: props.initialData?.request.station || null,
  });

  const onStationSelect = useCallback((e) => {
    if (e.detail.line && e.detail.station) {
      setState({
        line: e.detail.line,
        station: e.detail.station,
      });
    }
  }, []);

  // Replaces componentDidUpdate()
  useEffect(() => {
    const queryString = new URLSearchParams(state).toString();
    window.history.pushState(null, null, `?${queryString}`);
  }, [state.line, state.station]);

  // Replaces componentDidMount()
  useEffect(() => {
    window.addEventListener("station-select", onStationSelect, false);

    // Replaces componentWillUnmount()
    return function cleanup() {
      window.removeEventListener("station-select", this.onStationSelect, false);
    };
  });

  return (
    <div className="Layout">
      <div className="Layout-predictions">
        <Predictions
          line={state.line}
          station={state.station}
          networkData={props.networkData}
          initialData={props.initialData}
        />
      </div>
      <div className="Layout-network">
        <Network networkData={props.networkData} />
      </div>
      <div className="Layout-footer">
        <Footer />
      </div>
    </div>
  );
}

export default TubeTracker;
