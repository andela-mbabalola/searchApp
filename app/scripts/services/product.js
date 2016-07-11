(function() {
  'use strict';

  angular.module('searchApp.services')
    .factory('Products', ['$resource', function($resource) {
      var product = $resource('/api/product/:id', {
        id: '@_id',
      }, {
        update: {
          // this method issues a PUT request
          method: 'PUT'
        }
      }, {
        stripTrailingSlashes: false

      });
      return product;
    }]);
})();
