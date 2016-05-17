var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (sails) {

  return {

    defaults: {
      __configKey__: {
        // TODO: Default configuration
      }
    },

    config: {
      entry: [path.resolve(__dirname, '../../src/main.js')],
      output: {
        path: path.resolve(__dirname, '../../.tmp/public/'),
        filename: 'js/build/bundle.js',
        publicPath: 'http://localhost:3000/'
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../../src/assets/'),
            to: 'assets'
          }
        ])
      ],
      resolveLoader: {
        modulesDirectories: [
          path.resolve(__dirname, '../../node_modules')
        ]
      },
      module: {
        loaders: [
          {
            test: /\.vue$/,
            loader: 'vue'
          },
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          }
        ]
      }
    },

    configure: function () {
      // Create webpack compiler
      var compiler = webpack(this.config, function(err, stats) {
        compiler.run(function (err, stats) {
          if (err) sails.log.error('Webpack build failed', err);
        })
      });
    }

  };
}
