const path = require('path');
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {

  mode: "development",
  devtool: "cheap-module-source-map",

  optimization: {
    minimizer: [new UglifyJSPlugin()],
  },

  // entry: {
  //   // Running in browser, we need polyfill for ES2015 support.
  //   // We don't really need *all* of the babel polyfill but it's not
  //   // **that** big. We could have our own custom entrypoint where
  //   // we only import relevant core-js modules if we wanted.
  //   'mux': ['@babel/polyfill', 'providers/mux.ts'],
  //
  //   'jupyter-notebook': 'providers/jupyter-notebook.js',
  //
  //   // Babel isn't necessary in Electron.
  //   // TODO: we need multiple webpack configs for the various providers.
  //   // Electron includes an instance of the babel polyfill but not the
  //   // regenerator runtime (???) but we also don't need to transpile things
  //   // as far down as we do for the browser (e.g. we need the runtime to use
  //   // async/await but that's supported in electron natively).
  //   'blink': ['@babel/polyfill/noConflict', 'providers/blink.ts'],
  // },

  // SystemJS tries to require("fs") if given a file:// url but is also smart
  // enough to only try to do so if it detects that the JavaScript environment
  // is NodeJS. Nevertheless, Webpack gets confused because it doesn't know
  // anything about the (node-builtin) module fs, so we tell it to just ignore
  // all references to it.
  node: {
    "fs": "empty",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        parser: {
          amd: false
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: []
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        parser: {
          amd: false
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: []
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
