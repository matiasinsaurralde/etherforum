angular.module('cryptoforum', [ 'ngAnimate', 'ui.router', 'anim-in-out' ])
.controller( 'HomeCtrl', [ '$scope', '$window', '$state', 'walletService', HomeCtrl ] )
.controller( 'ForumCtrl', [ '$rootScope', '$state', '$stateParams', ForumCtrl ] )
.controller( 'TopicCtrl', [ '$rootScope', '$state', '$stateParams', TopicCtrl ] )
.service( 'walletService', [ '$http', '$rootScope', WalletService ] )
.config( config )
.config( routes )
.run( [ '$rootScope', '$window', 'walletService', function( $rootScope, $window, walletService ) {
  var web3 = new Web3();

  $rootScope.web3 = web3;
  $window.web3 = web3;

  $rootScope.defaultContract = { id: '0x1dcccf5ede1623a4b94495136247a11e14c1cc5a',
abi: [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"topics","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"content","type":"string"},{"name":"PostCount","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"ForumCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"content","type":"string"},{"name":"topic","type":"bytes32"}],"name":"createPost","outputs":[{"name":"postId","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"forums","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"TopicCount","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"name":"topic_posts","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"content","type":"string"},{"name":"forum","type":"uint256"}],"name":"createTopic","outputs":[{"name":"topicId","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"createForum","outputs":[{"name":"forumId","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"forums_topics","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"posts","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"content","type":"string"}],"type":"function"}] }

  $rootScope.contract =  web3.eth.contract( $rootScope.defaultContract.abi ).at( $rootScope.defaultContract.id );
  $window.contract = $rootScope.contract;

  if( walletService.storedWalletAvailable() ) {
    var storedWallet = walletService.storedWalletRestore();
  };

}]);

config.$inject = ['$urlRouterProvider', '$locationProvider' ];
function config($urlProvider, $locationProvider, $analyticsProvider, $cookies, $rootScope, $window ) {
  $urlProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled:false,
    requireBase: false
  });
  $locationProvider.hashPrefix('!');

}
