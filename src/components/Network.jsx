import React from "react";
import NetworkLine from "./NetworkLine.jsx";

function Network(props) {
  const lineCodes = Object.keys(props.networkData.lines);

  const lines = lineCodes.map((line) => (
    <NetworkLine networkData={props.networkData} line={line} key={line} />
  ));

  return <div className="Network">{lines}</div>;
}

export default Network;
