import React from "react";

function formatTimeToStation(timeTo) {
  const minutes = Math.round(timeTo / 60);
  const seconds = Math.round((timeTo - minutes * 60) / 30) * 30;
  const padding = seconds < 10 ? "0" : "";

  return `${minutes}:${padding}${seconds}`;
}

function Trains(props) {
  const results = props.trains.map((train) => {
    const formattedTime = formatTimeToStation(train.timeToStation);

    return (
      <tr className="Trains-arrival" key={train.platformName + train.id}>
        <td>
          <time dateTime={train.expectedArrival}>
            {train.timeToStation < 30 ? "-" : formattedTime}
          </time>
        </td>
        <td>{train.towards}</td>
        <td>{train.lineName}</td>
        <td>{train.currentLocation}</td>
      </tr>
    );
  });

  return (
    <table className="Trains">
      <thead>
        <tr>
          <th>Time</th>
          <th>Destination</th>
          <th>Line</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>{results}</tbody>
    </table>
  );
}

export default Trains;
