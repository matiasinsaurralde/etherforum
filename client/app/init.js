angular.module('cryptoforum', [ 'ui.router' ])
.controller( 'HomeCtrl', HomeCtrl )
.config( config )
.config( routes )
.run();

config.$inject = ['$urlRouterProvider', '$locationProvider' ];
  function config($urlProvider, $locationProvider, $analyticsProvider, $cookies) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }
