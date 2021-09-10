const externalModules = [
  '@lumino/widgets',
  '@jupyterlab/application',
  '@lumino/disposable',
  '@jupyterlab/docregistry',
  '@jupyterlab/notebook',
  '@jupyterlab/rendermime',
  '@jupyterlab/services',
];
const externals = Object.fromEntries(
  externalModules.map(mod => [mod, `commonjs2 ${mod}`])
);

module.exports = {
  entry: "./lib/labextension.js",
  output: {
    filename: "labextension.js",
    library: {
      type: 'umd'
    }
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  externals,
};
