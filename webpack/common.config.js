const path = require("path");
const SplitChunksPlugin = require("webpack/lib/optimize/SplitChunksPlugin");

module.exports = {
  entry: {
    app: ["./src/bootstrap.js"],
    // Removed the `vendor` entry point
  },

  resolve: {
    extensions: [".js", ".scss"],
    modules: ["node_modules"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        oneOf: [
          {
            // Use url-loader for files smaller than 10KB
            loader: "url-loader",
            options: {
              limit: 10000, // 10KB
              name: "[name].[hash:8].[ext]",
              publicPath: "/",
            },
          },
          {
            // Use file-loader for files larger than 10KB
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new SplitChunksPlugin({
      chunks: "all",
      minSize: 30000,
      maxSize: 250000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "-",
      // Removed the `name` property to let Webpack handle naming
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          enforce: true,
        },
      },
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};
