module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['should', 'mocha'],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-should',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackMiddleware: {
      noInfo: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
