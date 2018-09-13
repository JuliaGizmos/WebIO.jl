var webpack = require("webpack");

module.exports = [{
  mode: 'production',
  optimization: {
    minimize: false
  },
  entry: {
    bundle: './index.js'
  },
  output: {
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  }
}]
