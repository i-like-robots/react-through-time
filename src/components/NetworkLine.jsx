import React, { useCallback, useRef } from "react";

function NetworkLine({ line, networkData }) {
  const formRef = useRef();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);

      // Dispatch an event for other components to capture
      const updateEvent = new CustomEvent("station-select", {
        detail: Object.fromEntries(formData),
        bubbles: true,
      });

      formRef.current?.dispatchEvent(updateEvent);
    },
    [formRef]
  );

  const stationsOnLine = networkData.stationsOnLines[line];

  const options = stationsOnLine.map((stationCode) => (
    <option value={stationCode} key={stationCode}>
      {networkData.stations[stationCode]}
    </option>
  ));

  return (
    <form ref={formRef} method="GET" onSubmit={handleSubmit}>
      <fieldset className={`Network-line Network-line--${line}`}>
        <legend>{networkData.lines[line]}</legend>
        <input type="hidden" name="line" value={line} />
        <select name="station">{options}</select>
        <button type="submit" title="View train times">
          Go
        </button>
      </fieldset>
    </form>
  );
}

export default NetworkLine;
