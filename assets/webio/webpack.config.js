module.exports = {
  mode: 'production',
  optimization: {
      minimize: false
  },
  entry: {
    WebIO: './index.js'
  },
  output: {
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty'
  }
};
