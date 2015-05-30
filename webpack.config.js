var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index",
  output: {
    path: __dirname + "/dist",
    filename: "main.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.js$/, loader: "babel-loader?stage=0" },
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$\.eot$|\.wav$|\.mp3$/, loader: "file-loader"}
    ],
    noParse: [
      /karma-chrome-launcher/
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "node_modules/html-webpack-template/index.html",
      title: "React!",
      devServer: "http://localhost:3000",
      appMountId: "app"
    }),
  ],
  eslint: {
    configFile: '.eslintrc'
  },
  node: {
    fs: "empty"
  }
}
