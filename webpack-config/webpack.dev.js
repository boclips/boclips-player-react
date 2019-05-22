const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.js');

const distPath = path.resolve(__dirname, '../dist');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: distPath,
  },
  devtool: 'inline-source-map',
});
