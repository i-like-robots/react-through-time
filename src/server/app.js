var express = require("express");
var api = require("./api");

var app = express();

app.get("/api/:line/:station", function (req, res) {
  api.getData(req.params.line, req.params.station, function (err, data) {
    if (err) {
      console.error(err);
      res.status(err.code || 500).send("Internal error");
    } else {
      return res.json(data);
    }
  });
});

app.get("/", function (req, res) {
  if (req.query.line && req.query.station) {
    api.getData(req.query.line, req.query.station, function (err, data) {
      if (err) {
        console.error(err);
        res.status(err.code || 500).send("Internal error");
      } else {
        // var html = bootstrap(data);
        var html = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        res.send(html);
      }
    });
  } else {
    var html = "<pre>Hello, World</pre>";
    res.send(html);
  }
});

app.use(express.static("./public"));

module.exports = app;
