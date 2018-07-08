const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    host: '192.168.198.129',
    historyApiFallback: true,
    publicPath: '/'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    mainFields: ['jsnext:main', 'main']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory',
        include: path.resolve('src')
      },
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ],
        }),
        include: path.resolve('src')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
}