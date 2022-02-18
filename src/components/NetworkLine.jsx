var React = require("react");

var NetworkLine = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();

    // Dispatch an event for other components to capture
    var updateEvent = new CustomEvent("station-select", {
      detail: {
        station: this.refs.station.value,
        line: this.props.line,
      },
      bubbles: true,
    });

    this.refs.form.dispatchEvent(updateEvent);
  },

  render: function () {
    var line = this.props.line;
    var networkData = this.props.networkData;
    var stationsOnLine = networkData.stationsOnLines[line];

    var options = stationsOnLine.map(function (stationCode) {
      return (
        <option value={stationCode} key={stationCode}>
          {networkData.stations[stationCode]}
        </option>
      );
    });

    return (
      <form ref="form" method="GET" onSubmit={this.handleSubmit}>
        <fieldset className={"Network-line Network-line--" + line}>
          <legend>{networkData.lines[line]}</legend>
          <input type="hidden" name="line" value={line} />
          <select name="station" ref="station">
            {options}
          </select>
          <button type="submit" title="View train times">
            Go
          </button>
        </fieldset>
      </form>
    );
  },
});

module.exports = NetworkLine;
