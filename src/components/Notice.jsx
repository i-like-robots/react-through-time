var React = require("react");

var typeToText = {
  error: "Sorry an error occurred, please try again.",
  loading: "Loading predictions…",
  welcome: "Please choose a station.",
};

var Notice = React.createClass({
  render: function () {
    return (
      <div className={"Notice Notice--" + this.props.type}>
        <p>{typeToText[this.props.type]}</p>
      </div>
    );
  },
});

module.exports = Notice;
