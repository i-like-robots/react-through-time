const { register } = require("esbuild-register/dist/node");

register({
  format: "cjs",
  target: "node14",
});

const { app } = require("./app.js");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Running server at http://localhost:${port}, press ctrl + c to stop.`
  );
});
