const path = require("path");
const webpackMerge = require("webpack-merge");
const webpackCommon = require("./common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge(webpackCommon, {
  bail: true,
  devtool: "source-map",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../static/index.html"),
    filename: "[name]-[contenthash].min.js",
    sourceMapFilename: "[name]-[contenthash].map",
    chunkFilename: "[id]-[chunkhash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true, importLoaders: 2 } },
          { loader: "postcss-loader", options: { postcssOptions: { config: path.resolve(__dirname, "postcss.config.js") }, sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'], // Ensure old files are removed
      cleanStaleWebpackAssets: false,
      dry: false,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, "../static/index.html"), // Ensure this path is correct
      favicon: path.resolve(__dirname, "../static/favicon.ico"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../static"),
    //       globOptions: {
    //         ignore: ["index.html", "favicon.ico"] // Ensure these files are not copied
    //       }
    //     }
    //   ]
    // }),
    new DefinePlugin({ "process.env": { NODE_ENV: '"production"' } }),
    new MiniCssExtractPlugin({ filename: "[name]-[contenthash].min.css" }),
    new TerserPlugin({
      terserOptions: {
        compress: { drop_console: true },
        mangle: true
      },
      extractComments: false
    })
  ]
});
