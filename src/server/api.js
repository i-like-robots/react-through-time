import querystring from "querystring";
import networkUtils from "./networkUtils.js";
import httpRequest from "./httpRequest.js";
import networkData from "../data.json";

function formatData(line, station, data) {
  const platforms = {};

  data.sort((a, b) => a.timeToStation - b.timeToStation);

  data.forEach((item) => {
    platforms[item.platformName] = platforms[item.platformName] || [];
    platforms[item.platformName].push(item);
  });

  return {
    request: {
      line,
      station,
    },
    station: {
      lineName: networkData.lines[line],
      stationName: networkData.stations[station],
    },
    platforms,
  };
}

export function getData(line, station) {
  if (!networkUtils.isStationOnLine(line, station, networkData)) {
    const error = new Error();

    error.message = "Invalid station and/or line combination";
    error.code = 400;

    return Promise.reject(error);
  }

  const combinedLines = networkUtils.getCombinedLines(
    line,
    station,
    networkData
  );

  const path = `/Line/${combinedLines}/Arrivals`;

  const query = {
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY,
    stopPointId: station,
  };

  const opts = {
    path: `${path}?${querystring.stringify(query)}`,
    hostname: "api.tfl.gov.uk",
  };

  return httpRequest(opts).then((data) => {
    const json = JSON.parse(data);
    const formattedData = formatData(line, station, json);

    return formattedData;
  });
}
