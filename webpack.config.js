var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './src/index',
  resolve: {
    root: path.resolve('./src')
  },
  output: {
    path: __dirname,
    filename: 'assets/js/bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    })
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
      }
    ]
  },
  postcss: () => [require('autoprefixer'), require('precss')]
}
