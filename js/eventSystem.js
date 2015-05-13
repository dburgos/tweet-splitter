/*
https://gist.github.com/Yitsushi/e3b7823f7d4bf34faa4f
Author: https://gist.github.com/Yitsushi
*/
var EventSystem = (function() {
  var self = this;

  self.queue = {};

  return {
    publish: function (event, data) {
      var queue = self.queue[event];

      if (typeof queue === 'undefined') {
        return false;
      }

      queue.map(function( method ) {
        (method)(data);
      });

      return true;
    },
    subscribe: function(event, callback) {
      if (typeof self.queue[event] === 'undefined') {
        self.queue[event] = [];
      }

      self.queue[event].push(callback);
    }
  };
}());