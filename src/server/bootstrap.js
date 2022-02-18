const util = require("util");
const React = require("react");
const ReactDOM = require("react-dom/server");
const networkData = require("../data.json");
const TubeTracker = require("../components/TubeTracker.jsx");

const template = `<!DOCTYPE html>
  <html lang="en-GB">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>TfL London Underground Arrivals</title>
      <link rel="preload" href="/public/font.css" as="style">
      <link rel="stylesheet" href="/public/styles.css">
    </head>
    <body>
      <div id="app">%s</div>
      <script type="application/json" id="initialData">%s</script>
      <script src="/public/bundle.js"></script>
    </body>
  </html>
  `;

function bootstrap(initialData) {
  const appData = {
    networkData,
    initialData,
  };

  const app = ReactDOM.renderToString(
    React.createElement(TubeTracker, appData)
  );

  return util.format(template, app, JSON.stringify(appData));
}

module.exports = bootstrap;
