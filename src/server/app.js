import express from "express";
import api from "./api.js";
import bootstrap from "./bootstrap.js";

export const app = express();

app.get("/api/:line/:station", async (req, res) => {
  try {
    const data = await api.getData(req.params.line, req.params.station);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(err.code || 500).send("Internal error");
  }
});

app.get("/", async (req, res) => {
  try {
    let data;

    if (req.query.line && req.query.station) {
      data = await api.getData(req.query.line, req.query.station);
    }

    const html = bootstrap(data);
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(err.code || 500).send("Internal error");
  }
});

app.use("/public", express.static("./public"));
