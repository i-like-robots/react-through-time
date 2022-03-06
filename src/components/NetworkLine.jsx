import React from "react";

class NetworkLine extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // Dispatch an event for other components to capture
    const updateEvent = new CustomEvent("station-select", {
      detail: {
        station: this.station.value,
        line: this.props.line,
      },
      bubbles: true,
    });

    this.form.dispatchEvent(updateEvent);
  }

  render() {
    const { line, networkData } = this.props;
    const stationsOnLine = networkData.stationsOnLines[line];

    const options = stationsOnLine.map((stationCode) => (
      <option value={stationCode} key={stationCode}>
        {networkData.stations[stationCode]}
      </option>
    ));

    return (
      <form
        ref={(c) => (this.form = c)}
        method="GET"
        onSubmit={this.handleSubmit}
      >
        <fieldset className={`Network-line Network-line--${line}`}>
          <legend>{networkData.lines[line]}</legend>
          <input type="hidden" name="line" value={line} />
          <select name="station" ref={(c) => (this.station = c)}>
            {options}
          </select>
          <button type="submit" title="View train times">
            Go
          </button>
        </fieldset>
      </form>
    );
  }
}

export default NetworkLine;
