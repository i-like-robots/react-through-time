function isLine(line, data) {
  return line && line in data.lines;
}

function isStation(station, data) {
  return station && station in data.stations;
}

function isStationOnLine(line, station, data) {
  return (
    isLine(line, data) &&
    isStation(station, data) &&
    data.stationsOnLines[line].indexOf(station) > -1
  );
}

function getCombinedLines(line, station, data) {
  var lines = [line];

  if (station in data.sharedPlatforms) {
    var lineGroups = data.sharedPlatforms[station].filter(function (lineGroup) {
      return lineGroup.indexOf(line) > -1;
    });

    // Flatten array of arrays
    lines = lines.concat.apply(lines, lineGroups);

    // Remove duplicates
    lines = lines.filter(function (line, i) {
      return lines.indexOf(line) === i;
    });
  }

  return lines.join();
}

module.exports = {
  isLine: isLine,
  isStation: isStation,
  isStationOnLine: isStationOnLine,
  getCombinedLines: getCombinedLines,
};
