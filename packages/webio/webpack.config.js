const path = require('path');
const webpack = require("webpack");

module.exports = {
  // https://webpack.js.org/configuration/entry-context/
  // Resolve all files from "src/" (so "webio.js" means "src/webio.js").
  context: path.resolve(__dirname, "src"),

  mode: "development",

  devtool: "cheap-module-source-map",

  entry: {
    // Running in browser, we need polyfill for ES2015 support.
    // We don't really need *all* of the babel polyfill but it's not
    // **that** big. We could have our own custom entrypoint where
    // we only import relevant core-js modules if we wanted.
    'mux': ['@babel/polyfill', 'providers/mux.ts'],
    // Babel isn't necessary in Electron.
    // TODO: we need multiple webpack configs for the various things
    // Electron includes an instance of the babel polyfill but not the
    // regenerator runtime (???) but we also don't need to transpile things
    // as far down as we do for the browser (e.g. we need the runtime to use
    // async/await but that's supported in electron natively).
    'blink': ['@babel/polyfill/noConflict', 'providers/blink.ts'],
  },

  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve(__dirname, 'dist/'),
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
