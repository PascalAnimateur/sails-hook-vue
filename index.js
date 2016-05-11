var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");

module.exports = function (sails) {

  return {

    defaults: {
      __configKey__: {
        // TODO: Default configuration
      }
    },

    configure: function () {
      var config = sails.config[this.configKey];

      sails.log.verbose("Vue.js hook configured.");
    }

  };
}
