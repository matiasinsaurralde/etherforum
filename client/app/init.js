angular.module('cryptoforum', [ 'ngAnimate', 'ui.router', 'anim-in-out' ])
.controller( 'HomeCtrl', [ '$scope', '$window', '$state', 'walletService', HomeCtrl ] )
.controller( 'ForumCtrl', [ '$rootScope', '$state', ForumCtrl ] )
.service( 'walletService', [ '$http', '$rootScope', WalletService ] )
.config( config )
.config( routes )
.run( [ '$rootScope', '$window', 'walletService', function( $rootScope, $window, walletService ) {
  var web3 = new Web3();

  $rootScope.web3 = web3;
  $window.web3 = web3;

  $rootScope.defaultContract = { id: '0x0b092122102eeb28b1980488f8335617c702d1d8',
    abi: [{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"forum","type":"uint256"}],"name":"createMessage","outputs":[{"name":"messageID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"forums","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"messageCount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"createForum","outputs":[{"name":"forumID","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"forum","type":"uint256"},{"name":"message","type":"uint256"}],"name":"getMessage","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"forumCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"}],"name":"readMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"forumID","type":"uint256"}],"name":"forumCreated","type":"event"}] }

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
