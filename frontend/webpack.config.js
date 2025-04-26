// webpack.config.js
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  mode: "development", // Рекомендуется использовать "development" для режима разработки
  entry: "./src/Carousel.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js', // Задайте нужное имя файла
    libraryTarget: 'commonjs2'
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "util": require.resolve("util/"),
      "fs": false,
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "net": false,
      "tls": false,
      "child_process": false,
      "async_hooks": false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // Рекомендуется использовать массив для указания загрузчиков
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/@react-aria\/ssr/
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
        pathRewrite: { '^/uploads': '' }
      }
    }
  }
};