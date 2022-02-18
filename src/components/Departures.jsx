import React from "react";
import Trains from "./Trains.jsx";

function Departures(props) {
  const { station, platforms } = props.predictionData;

  const trains = Object.keys(platforms).map((platform) => (
    <div className="Platform" key={platform}>
      <h2 className="Platform-heading">{platform}</h2>
      <Trains trains={platforms[platform]} />
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
        <p class="Departures-noData">No train arrivals due.</p>
      )}
    </div>
  );
}

export default Departures;
