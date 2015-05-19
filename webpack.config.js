var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?stage=0' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      title: 'React!',
      devServer: 'http://localhost:3000',
      appMountId: 'app'
    })
  ]
}
