module.exports = {
  entry: {
    WebIO: './index.js'
  },
  output: {
    filename: 'webio.bundle.js'
  },
  node: {
    fs: 'empty'
  }
};
