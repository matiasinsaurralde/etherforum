function routes( $stateProvider, $urlRouterProvider) {
  console.log(1,$stateProvider);
  $stateProvider.state( 'home', {
    name: 'home',
    url: '/',
    views: {
      '@': { templateUrl: 'app/views/home.html' }
    }
  })
  .state( 'forums', {
    name: 'forums',
    url: '/forums',
    views: {
      '@': { templateUrl: 'app/views/forums.html' }
    }
  })
}
