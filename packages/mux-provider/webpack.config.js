const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');

module.exports = merge(baseConfig, {
  context: path.resolve(__dirname, "src"),
  entry: {
    "mux": ["@babel/polyfill", "mux.ts"],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      "systemjs": "systemjs/dist/system",
    }
  },

  externals: {
    "base/js/namespace": "base/js/namespace",
    "notebook/js/outputarea": "notebook/js/outputarea",
    "jquery": "jquery",
  }
});
