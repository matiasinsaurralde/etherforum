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
  .state( 'forums.create', {
    name: 'forums.create',
    url: '/create',
    views: {
      '@': { templateUrl: 'app/views/forums_create.html' }
    }
  })
  .state( 'forums.topics', {
    name: 'forums.topics',
    url: '/:id/topics',
    params: { id: null },
    views: {
      '@': { templateUrl: 'app/views/forums_topics.html' }
    }
  })
  .state( 'forums.topics.read', {
    name: 'forums.topics.read',
    url: '/:topic_id',
    params: { id: null, topic_id: null },
    views: {
      '@': { templateUrl: 'app/views/topic.html' }
    }
  })
}
