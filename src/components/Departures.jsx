import React from "react";
import Trains from "./Trains.jsx";

function Departures(props) {
  const { station, platforms } = props.predictionData;

  const trains = Object.entries(platforms).map(([platform, trains]) => (
    <div className="Platform" key={platform}>
      <h2 className="Platform-heading">{platform}</h2>
      <Trains trains={trains} />
    </div>
  ));

  return (
    <div className="Departures">
      <h1 className="Departures-heading">
        {`${station.stationName} Station, ${station.lineName} Line`}
      </h1>
      {trains.length ? (
        trains
      ) : (
        <p className="Departures-noData">No train arrivals due.</p>
      )}
    </div>
  );
}

export default Departures;
