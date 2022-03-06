var React = require("react");
var Trains = require("./Trains.jsx");

var Departures = React.createClass({
  render: function () {
    var station = this.props.predictionData.station;
    var platforms = this.props.predictionData.platforms;

    var trains = Object.keys(platforms).map(function (platform) {
      return (
        <div className="Platform" key={platform}>
          <h2 className="Platform-heading">{platform}</h2>
          <Trains trains={platforms[platform]} />
        </div>
      );
    });

    return (
      <div className="Departures">
        <h1 className="Departures-heading">
          {station.stationName + " Station, " + station.lineName + " Line"}
        </h1>
        {trains.length ? (
          trains
        ) : (
          <p className="Departures-noData">No train arrivals due.</p>
        )}
      </div>
    );
  },
});

module.exports = Departures;
