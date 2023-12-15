var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/Carousel.js",
  output: {
    path: path.resolve("build"),
    filename: "Carousel.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  externals: {
    react: "react"
  }
};