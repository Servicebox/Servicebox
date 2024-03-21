var path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

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
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/uploads': {
        target: 'https://servicebox35.ru',
        changeOrigin: true,
        pathRewrite: {'^/uploads' : ''}
      }
    }
  }
};