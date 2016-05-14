var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
//var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: './src/index',
  output: {
    path: 'dist/',
    filename: 'assets/js/bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { context: 'assets/', from: '**/*', to: 'assets' },
      { from: 'index.html' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    //new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
      }
    ]
  },
  postcss: () => [require('autoprefixer'), require('precss')]
}
