require("babel-register")({
  presets: [
    [
      "env",
      {
        targets: {
          node: 6.7,
        },
      },
    ],
    "react",
  ],
  extensions: [".jsx"],
});

const app = require("./app");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Running server at http://localhost:${port}, press ctrl + c to stop.`
  );
});
