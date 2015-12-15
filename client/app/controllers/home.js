function HomeCtrl( $scope, walletService ) {
  $scope.generateAddress = function() {
    walletService.generateAddress();
  };
};
