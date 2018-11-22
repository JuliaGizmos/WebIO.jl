const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');

module.exports = merge(baseConfig, {
  context: path.resolve(__dirname, "src"),
  entry: {
    "generic-http": ["@babel/polyfill", "generic-http.ts"],
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
});
