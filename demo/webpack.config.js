const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('../webpack-config/webpack.dev.js');

const path = require('path');

module.exports = merge(common, {
  entry: {
    'demo': path.resolve(__dirname, 'index.tsx')
  },
  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'silent-check-sso.html',
      template: path.resolve(__dirname, 'silent-check-sso.html'),
    }),
  ],
});
