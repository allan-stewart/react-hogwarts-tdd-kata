var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index",
  output: {
    path: __dirname + "/dist",
    filename: "main.js"
  },
  module: {
    loaders: [
      // Extract css files
      //{
        //test: /\.css$/,
        //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      //},
      {test: /\.js$/, loader: "babel-loader?stage=0" },
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
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
