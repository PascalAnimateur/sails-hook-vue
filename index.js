module.exports = function(sails) {

  return {

    defaults: {
      __configKey__: {
        // TODO: Default configuration
      }
    },

    configure: function() {
      var config = sails.config[this.configKey];

      sails.log.verbose("Vue.js hook activated.");
    }

  }
};
