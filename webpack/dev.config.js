const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");

const proxyRules = require("../proxy/rules");

module.exports = merge(webpackCommon, {
  devtool: "inline-source-map",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../static/dist"),
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id]-chunk.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 2 } },
          {
            loader: "sass-loader",
            options: {
              sassOptions: { outputStyle: "expanded" },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),

    new HtmlWebpackPlugin({
      inject: "body",
      filename: "index.html",
      template: path.resolve(__dirname, "../static/index.html"),
      favicon: path.resolve(__dirname, "../static/favicon.ico"),
    }),
  ],
  devServer: {
    host: "localhost",
    port: 3000,

    static: {
      directory: path.resolve(__dirname, "../static"),
    },
    compress: true,
    hot: true,
    historyApiFallback: { disableDotRule: true },
    watchFiles: { paths: ["src/**/*"], options: { usePolling: true } }, // This replaces the 'overlay' option
    proxy: Array.isArray(proxyRules) ? proxyRules : [], // Ensure proxyRules is an array or provide default
  },
});
