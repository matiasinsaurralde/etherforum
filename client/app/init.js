angular.module('cryptoforum', [ 'ngAnimate', 'ui.router', 'anim-in-out' ])
.controller( 'HomeCtrl', [ '$scope', 'walletService', HomeCtrl ] )
.controller( 'ForumCtrl', [ '$rootScope', '$state', ForumCtrl ] )
.service( 'walletService', WalletService )
.config( config )
.config( routes )
.run( [ '$rootScope', '$state', 'walletService', function( $rootScope, $state, walletService ) {
  var web3 = new Web3();

  // web3.setProvider( new web3.providers.HttpProvider() );
  $rootScope.web3 = web3;
  window.web3 = web3;

  // $rootScope.$watch( $rootScope.web3.eth.getBalance(web3.eth.coinbase).c ) // :p

  $rootScope.defaultContract = { id: '0x0b092122102eeb28b1980488f8335617c702d1d8',
    abi: [{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"forum","type":"uint256"}],"name":"createMessage","outputs":[{"name":"messageID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"forums","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"messageCount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"createForum","outputs":[{"name":"forumID","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"forum","type":"uint256"},{"name":"message","type":"uint256"}],"name":"getMessage","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"forumCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"}],"name":"readMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"forumID","type":"uint256"}],"name":"forumCreated","type":"event"}] }

  $rootScope.contract =  web3.eth.contract( $rootScope.defaultContract.abi ).at( $rootScope.defaultContract.id );
  window.contract = $rootScope.contract;

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

window.onload = function() {
/*
  window.web3 = new Web3(); // ??

  window.forumContract = 0xfc7575c74363e9e554e6b0a6b7f43f740010fb1e;
  window.forumAbiDefinition = [{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"forum","type":"uint256"}],"name":"createMessage","outputs":[{"name":"messageID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"forums","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"messageCount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"createForum","outputs":[{"name":"forumID","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"forum","type":"uint256"},{"name":"message","type":"uint256"}],"name":"getMessage","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"forumCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"}],"name":"readMessage","type":"event"}];

  var contract = web3.eth.contract( forumAbiDefinition ).at( forumContract );
  web3.setProvider( new web3.providers.HttpProvider() );

  document.getElementById( 'eth_coinbase' ).innerText = web3.eth.coinbase;
*/

};
