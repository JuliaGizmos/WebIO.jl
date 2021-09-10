const path = require("path");

module.exports = {
  entry: "./webio-jupyter-nbextension/nbextension.js",
  output: {
    path: path.resolve(__dirname, 'webio_jupyter_extension/nbextension'),
    filename: "nbextension.js",
    library: {
      type: 'umd'
    }
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  externals: [
    "jquery",
    function ({ context, request }, callback) {
      if (/^base\/.+/.test(request) || /^notebook\/.+/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    },
  ]
};
