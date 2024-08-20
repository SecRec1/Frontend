const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

const proxyRules = require("../proxy/rules");

module.exports = merge(webpackCommon, {
  mode: "development",
  devtool: "inline-source-map", // Useful for debugging, generates source maps inline
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id]-chunk.js",
    publicPath: "/", // Ensures correct asset loading paths
  },
  module: {
    rules: [
      {
        test: /\.s?css$/, // Matches both .css and .scss files
        use: [
          "style-loader", // Injects styles into the DOM
          {
            loader: "css-loader",
            options: { importLoaders: 2 }, // Ensures loaders after css-loader are applied to @import'ed resources
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: { outputStyle: "expanded" }, // Expanded style for easier debugging
              sourceMap: true, // Generates source maps for Sass files
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"), // Sets the environment variable for development mode
    }),
    new HtmlWebpackPlugin({
      inject: "body", // Injects scripts at the end of the body
      filename: "index.html",
      template: path.resolve(__dirname, "../static/index.html"), // Ensure this path is correct
      favicon: path.resolve(__dirname, "../static/favicon.ico"),
    }),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    static: {
      directory: path.resolve(__dirname, "../static/assets/images"), // Serves static files from the specified directory
    },
    compress: true, // Enables gzip compression for better performance
    hot: true, // Enables Hot Module Replacement for faster development
    historyApiFallback: { disableDotRule: true }, // Ensures client-side routing works by redirecting all 404s to index.html
    watchFiles: {
      paths: ["src/**/*"], // Watches for changes in the specified directories
      options: {
        usePolling: true, // Uses polling to detect file changes, useful for certain environments
      },
    },
    proxy: Array.isArray(proxyRules) ? proxyRules : [], // Sets up a proxy if proxyRules is an array
  },
});
