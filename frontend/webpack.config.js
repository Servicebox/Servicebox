var path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  mode: "production",
  entry: "./src/Carousel.js",
  output: {
    path: path.resolve("build"),
    filename: "Carousel.js",
    libraryTarget: "commonjs2",
      path: path.join(__dirname, 'build'),
    filename: 'backend.js'
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
        loader: "style-loader!css-loader"
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
    navigateApiFallback: true,
    proxy: {
      '/uploads': {
        target: 'https://servicebox35.ru',
        changeOrigin: true,
        pathRewrite: {'^/uploads' : ''}
      }
    }
  }
};