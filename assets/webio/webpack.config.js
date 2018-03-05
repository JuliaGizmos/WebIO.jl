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
},
{
  mode: 'production',
  optimization: {
    minimize: true
  },
  entry: {
    'webcomponents-lite.min': './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'
  },
  output: {
    filename: '[name].js'
  },
  plugins: [new webpack.IgnorePlugin(/vertx/)],
  node: {
    fs: 'empty'
  }
}]
