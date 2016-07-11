(function() {
  'use strict';

  angular.module('searchApp.controllers', []);
  angular.module('searchApp.services', []);

  require('./services/product');
  require('./controllers/productCtrl');

  window.app = angular.module('searchApp', [
    'searchApp.services',
    'searchApp.controllers',
    'ui.router',
    'ngMaterial',
    'md.data.table',
    'ngResource'
  ]);

  window.app.config(['$mdThemingProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($mdThemingProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/404');

      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('pink');

        $stateProvider
          .state('home', {
            url: '/',
            controller: 'productCtrl',
            templateUrl: 'jade/home.html'
          });

        $locationProvider.html5Mode(true);
    }
  ]);
})();
