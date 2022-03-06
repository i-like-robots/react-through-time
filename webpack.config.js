const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/browser/bootstrap.js"],
  output: {
    path: path.resolve("./public"),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            [
              "env",
              {
                targets: {
                  browsers: ["ie 11", "safari 10", "chrome 48", "ff 44"],
                },
              },
            ],
            "react",
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
  devtool: "none",
};
