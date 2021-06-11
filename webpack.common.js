const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({ template: __dirname + '/src/index.html' }),
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
]

const withReport = process.env.npm_config_withReport
if (withReport) {
  plugins.push(new BundleAnalyzerPlugin())
}

const rules = [
  {
    test: /\.[t]sx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ['file-loader'],
  },
]

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  plugins,
  module: { rules },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}
