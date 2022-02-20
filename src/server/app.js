import express from "express";
import api from "./api.js";
import bootstrap from "./bootstrap.js";

export const app = express();

app.get("/api/:line/:station", (req, res) => {
  api
    .getData(req.params.line, req.params.station)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(err.code || 500).send("Internal error");
    });
});

app.get("/", (req, res) => {
  let fetchData;

  if (req.query.line && req.query.station) {
    fetchData = api.getData(req.query.line, req.query.station);
  }

  Promise.resolve(fetchData)
    .then((data) => {
      const html = bootstrap(data);
      res.send(html);
    })
    .catch((err) => {
      console.error(err);
      res.status(err.code || 500).send("Internal error");
    });
});

app.use("/public", express.static("./public"));
