const path = require('path')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const { resolve } = require('./import.resolver.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: `/`,
    filename: '[name].[contenthash].js',
  },
  resolve,
})
