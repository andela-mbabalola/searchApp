(function() {
  'use strict';

  angular.module('searchApp.controllers')
    .controller('productCtrl', ['Products', '$scope', '$http', '$state' , function(Products, $scope, $http, $state) {
      console.log('here');
      $scope.init = function() {

          $http.get('/api/product/products')
            .then(function(resp) {
              console.log('here', resp);
              $scope.products = resp.data;
            });
      };

      $scope.searchProduct   = '';
    }]);
})();
