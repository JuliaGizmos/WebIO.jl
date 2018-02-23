module.exports = {
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
