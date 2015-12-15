function HomeCtrl( $scope, $window, $state, walletService ) {
  $scope.generateAddress = function() {
    walletService.generateAddress();
  };

  $scope.destroyAddressAndKeys = function() {
    $window.localStorage.clear();
    $window.location.reload();
  };
};
