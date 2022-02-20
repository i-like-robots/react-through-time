export function isLine(line, data) {
  return line && line in data.lines;
}

export function isStation(station, data) {
  return station && station in data.stations;
}

export function isStationOnLine(line, station, data) {
  return (
    isLine(line, data) &&
    isStation(station, data) &&
    data.stationsOnLines[line].includes(station)
  );
}

export function getCombinedLines(line, station, data) {
  const lines = [line];

  if (station in data.sharedPlatforms) {
    const lineGroups = data.sharedPlatforms[station].filter((lineGroup) => {
      return lineGroup.includes(line);
    });

    lines.push(...lineGroups.flat());
  }

  return Array.from(new Set(lines)).join();
}
