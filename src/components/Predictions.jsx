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
  const [state, setState] = useState({
    status: props.initialData ? "success" : "welcome",
    predictionData: props.initialData,
  });

  const pollRef = useRef(null);
  const isMountedRef = useRef(false);

  const onFetchError = useCallback((err) => {
    setState({
      status: "error",
      predictionData: undefined,
    });

    console.error(err);
  }, []);

  const onFetchSuccess = useCallback((data) => {
    setState({
      status: "success",
      predictionData: data,
    });
  }, []);

  const fetchData = useCallback(
    async (line, station) => {
      // Logic moved from shouldComponentUpdate()
      // Only update when line/station changes or new predictions load otherwise the
      // loading notice will be displayed when refreshing current predictions.
      const showLoading =
        props.line !== state.predictionData?.request.line ||
        props.station !== state.predictionData?.request.station;

      setState({
        ...state,
        status: showLoading ? "loading" : "success",
      });

      const url = `/api/${line}/${station}`;

      try {
        const data = await fetchRequest(url);
        onFetchSuccess(data);
      } catch (err) {
        onFetchError(err);
      }
    },
    [
      onFetchSuccess,
      onFetchError,
      props.line,
      props.station,
      state.predictionData,
    ]
  );

  const resetPoll = useCallback(
    (line, station) => {
      clearInterval(pollRef.current);
      pollRef.current = setInterval(() => fetchData(line, station), 1000 * 30);
    },
    [pollRef]
  );

  // Replaces componentWillReceiveProps()
  useEffect(() => {
    if (isMountedRef.current && props.line && props.station) {
      fetchData(props.line, props.station);
      resetPoll(props.line, props.station);
    }
  }, [props.line, props.station]);

  // Replaces componentDidMount()
  useEffect(() => {
    isMountedRef.current = true;

    if (props.line && props.station) {
      fetchData(props.line, props.station);
    }

    // Replaces componentWillUnmount()
    return function cleanup() {
      clearInterval(pollRef.current);
    };
  }, []);

  if (state.status === "success") {
    return <Departures predictionData={state.predictionData} />;
  }

  return <Notice type={state.status} />;
}

export default Predictions;
