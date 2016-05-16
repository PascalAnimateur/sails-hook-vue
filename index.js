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
        path: path.resolve(sails.config.paths.public),
        filename: 'js/build/bundle.js',
        publicPath: 'http://localhost:3000/'
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
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
        if (process.env.NODE_ENV === 'development') {
          // Development: Watch for changes
          sails.log.info('Watching for changes...');
          compiler.watch({ aggregateTimeout: 300 }, function (err, stats) {
            if (err) sails.log.error('Webpack watch failed', err);
          });
        }
        else {
          // Production: Run production build
          sails.log.info('Running production build...');
          compiler.run(function (err, stats) {
            if (err) sails.log.error('Webpack build failed', err);
          })
        }
      });

      // Start the webpack dev server
      if (process.env.NODE_ENV === 'development') {
        this.config.entry.unshift('webpack-dev-server/client?http://localhost:3000/', 'webpack/hot/dev-server');
        var server = new webpackDevServer(compiler, {
          contentBase: 'assets',
          hot: true,
          quiet: true
        });
        server.listen(3000);
      }

      sails.log.verbose("Vue.js hook configured.");
    }

  };
}
