const path = require("path");

module.exports = {
  devtool: "eval-source-map",
  entry: "./js/scripts.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
