const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  entry: path.join(__dirname, '../react/index.ts'),
  devtool: 'cheap-module-source-map',
  output: {
    environment: {
      arrowFunction: false,
      const: false,
    },
    path: path.join(__dirname, '../lib/'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {},
  plugins: [],
  externals: [
    {
      react: {
        react: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    function ({ context, request }, callback) {
      if (/echarts/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    'resize-observer-polyfill',
  ],
};

module.exports = merge(prodConfig, baseConfig);
