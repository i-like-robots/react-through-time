import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const { fetchData, resetPoll } = useMemo(() => {
    const onFetchError = (err) => {
      setStatus("error");
      setPredictionData(undefined);

      console.error(err);
    };

    const onFetchSuccess = (data) => {
      setPredictionData(data);
      setStatus("success");

      resetPoll(data.request.line, data.request.station);
    };

    const fetchData = async (line, station, showLoading) => {
      setStatus(showLoading ? "loading" : "success");

      const url = `/api/${line}/${station}`;

      try {
        const data = await fetchRequest(url);
        onFetchSuccess(data);
      } catch (err) {
        onFetchError(err);
      }
    };

    const resetPoll = (line, station) => {
      pollRef.current = setTimeout(
        () => fetchData(line, station, false),
        1000 * 30
      );
    };

    return { fetchData, resetPoll };
  }, []);

  // Replaces componentWillReceiveProps()
  useEffect(() => {
    const fetchNewData =
      props.line !== predictionData?.request.line ||
      props.station !== predictionData?.request.station;

    if (props.line && props.station && fetchNewData) {
      clearTimeout(pollRef.current);
      fetchData(props.line, props.station, true);
    }
  }, [
    fetchData,
    predictionData?.request.line,
    predictionData?.request.station,
    props.line,
    props.station,
  ]);

  // Replaces componentDidMount()
  useEffect(() => {
    if (props.line && props.station) {
      resetPoll(props.line, props.station);
    }

    // Replaces componentWillUnmount()
    return () => {
      clearTimeout(pollRef.current);
    };
  }, []);

  if (status === "success") {
    return <Departures predictionData={predictionData} />;
  }

  return <Notice type={status} />;
}

export default Predictions;
