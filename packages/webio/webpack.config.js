const path = require('path');
const webpack = require("webpack");

module.exports = {
  // https://webpack.js.org/configuration/entry-context/
  // Resolve all files from "src/" (so "webio.js" means "src/webio.js").
  context: path.resolve(__dirname, "src"),

  mode: "development",

  devtool: "cheap-module-source-map",

  entry: {
    'mux': ['@babel/polyfill', 'providers/mux-entrypoint.ts']
  },

  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve( __dirname, 'dist/' ),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                // ['@babel/plugin-proposal-class-properties'],
                // ['@babel/plugin-proposal-async-generator-functions'],
                // ['@babel/plugin-transform-object-super'],
                // ['@babel/plugin-proposal-object-rest-spread'],
              ]
            },
          },
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
};
