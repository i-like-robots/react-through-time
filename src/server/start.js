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

var app = require("./app");

var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log(
    "Running server at http://localhost:" + port + ", press ctrl + c to stop."
  );
});
