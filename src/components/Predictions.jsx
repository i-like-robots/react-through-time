import React, { useCallback, useEffect, useRef, useState } from "react";
import Notice from "./Notice.jsx";
import Departures from "./Departures.jsx";

async function fetchRequest(url) {
  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(
      `Unexpected response code: ${res.status}, ${res.statusText}`
    );
  }
}

function Predictions(props) {
  const [status, setStatus] = useState(
    props.initialData ? "success" : "welcome"
  );

  const [predictionData, setPredictionData] = useState(props.initialData);

  const pollRef = useRef(null);

  const onFetchError = useCallback((err) => {
    setStatus("error");
    console.error(err);
  }, []);

  const onFetchSuccess = useCallback((data) => {
    setStatus("success");
    setPredictionData(data);
  }, []);

  const fetchData = useCallback(async (line, station, showLoading) => {
    setStatus(showLoading ? "loading" : "success");

    const url = `/api/${line}/${station}`;

    try {
      const data = await fetchRequest(url);
      onFetchSuccess(data);
    } catch (err) {
      onFetchError(err);
    }
  }, []);

  const resetPoll = useCallback(
    (line, station) => {
      clearInterval(pollRef.current);
      pollRef.current = setInterval(() => fetchData(line, station), 1000 * 30);
    },
    [fetchData]
  );

  // Replaces componentWillReceiveProps()
  // Replaces componentDidMount()
  const fetchNewData =
    props.line !== predictionData?.request.line ||
    props.station !== predictionData?.request.station;

  useEffect(() => {
    if (props.line && props.station) {
      if (fetchNewData) {
        fetchData(props.line, props.station, true);
      }

      resetPoll(props.line, props.station);
    }
  }, [fetchData, resetPoll, props.line, props.station, fetchNewData]);

  useEffect(() => {
    // Replaces componentWillUnmount()
    return function () {
      clearInterval(pollRef.current);
    };
  }, []);

  if (status === "success") {
    return <Departures predictionData={predictionData} />;
  }

  return <Notice type={status} />;
}

export default Predictions;
