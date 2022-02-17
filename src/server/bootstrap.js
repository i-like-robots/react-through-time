var util = require("util");
var React = require("react");
var networkData = require("../data.json");
var TubeTracker = require("../components/TubeTracker.jsx");

var template =
  '<!DOCTYPE html>\
  <html lang="en-GB">\
    <head>\
      <meta charset="utf-8">\
      <meta name="viewport" content="width=device-width, initial-scale=1">\
      <title>TfL London Underground Arrivals</title>\
      <link rel="preload" href="/font.css" as="style">\
      <link rel="stylesheet" href="/styles.css">\
    </head>\
    <body>\
      <div id="app">%s</div>\
      <script type="application/json" id="initialData">%s</script>\
      <script src="/build/app.js"></script>\
    </body>\
  </html>\n';

function bootstrap(initialData) {
  var appData = {
    networkData: networkData,
    initialData: initialData,
  };

  var app = React.renderToString(React.createElement(TubeTracker, appData));

  return util.format(template, app, JSON.stringify(appData));
}

module.exports = bootstrap;
