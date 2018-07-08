const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  devtool: 'hidden-source-map',
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
            { loader: 'css-loader?minimize' },
            { loader: 'less-loader' }
          ],
        }),
        include: path.resolve('src')
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inlineSource: 'runtime~.+\\.js'
    }),
    new InlineSourcePlugin()
  ]
}