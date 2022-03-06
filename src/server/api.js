var querystring = require("querystring");
var networkUtils = require("./networkUtils");
var httpRequest = require("./httpRequest");
var networkData = require("../data");

function formatData(line, station, data) {
  var platforms = {};

  data.sort(function (a, b) {
    return a.timeToStation - b.timeToStation;
  });

  data.forEach(function (item) {
    platforms[item.platformName] = platforms[item.platformName] || [];
    platforms[item.platformName].push(item);
  });

  return {
    request: {
      line: line,
      station: station,
    },
    station: {
      lineName: networkData.lines[line],
      stationName: networkData.stations[station],
    },
    platforms: platforms,
  };
}

function getData(line, station, callback) {
  if (!networkUtils.isStationOnLine(line, station, networkData)) {
    var error = new Error();

    error.message = "Invalid station and/or line combination";
    error.code = 400;

    return callback(error, null);
  }

  var combinedLines = networkUtils.getCombinedLines(line, station, networkData);

  var path = "/Line/" + combinedLines + "/Arrivals";

  var query = {
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY,
    stopPointId: station,
  };

  var opts = {
    path: path + "?" + querystring.stringify(query),
    hostname: "api.tfl.gov.uk",
  };

  httpRequest(opts, function (err, data) {
    if (err) {
      return callback(err, null);
    }

    try {
      var json = JSON.parse(data);
      var formattedData = formatData(line, station, json);

      callback(null, formattedData);
    } catch (err) {
      return callback(err, null);
    }
  });
}

module.exports = {
  getData: getData,
};
