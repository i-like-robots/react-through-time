var React = require("react");

function formatTimeToStation(timeTo) {
  var minutes = Math.round(timeTo / 60);
  var seconds = Math.round((timeTo - minutes * 60) / 30) * 30;

  return (
    "" +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    (seconds > 0 ? seconds : "0")
  );
}

var Trains = React.createClass({
  render: function () {
    var trains = this.props.trains;

    var results = trains.map(function (train) {
      var formattedTime = formatTimeToStation(train.timeToStation);

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
  },
});

module.exports = Trains;
