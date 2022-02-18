import React from "react";

const typeToText = {
  error: "Sorry an error occurred, please try again.",
  loading: "Loading predictions…",
  welcome: "Please choose a station.",
};

function Notice(props) {
  return (
    <div className={`Notice Notice--${props.type}`}>
      <p>{typeToText[props.type]}</p>
    </div>
  );
}

export default Notice;
