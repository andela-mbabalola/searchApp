(function() {
  'use strict';

  var _productRoute = require('./products.route');

  var routes = function(router) {
    _productRoute(router);
  };
  module.exports = routes;
})();
