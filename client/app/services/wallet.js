function WalletService( $http, $rootScope ) {
  function generateAddress() {
    var secretSeed = lightwallet.keystore.generateRandomSeed();
    var password = '12345';

    var ks = new lightwallet.keystore(secretSeed, password);

    ks.generateNewAddress(password, 1);
    var addr = ks.getAddresses();

    ks.passwordProvider = function (callback) {
      // var pw = prompt("Please enter password", "Password");
      callback(null, password);
    };

    storeWallet( ks );
    storedWalletRestore();

    requestFreeEther( addr[0].toString() );

  }

  function storeWallet( wallet ) {
    window.localStorage.wallet = wallet.serialize();
  }

  function storedWalletAvailable() {
    return window.localStorage.wallet;
  }

  function storedWalletRestore() {
    var wallet = lightwallet.keystore.deserialize( window.localStorage.wallet ),
        address = wallet.getAddresses()[0];

    wallet.passwordProvider = function (callback) {
      // var pw = prompt("Please enter password", "Password");
      callback(null, '12345');
    };

    $rootScope.wallet = wallet;

    web3.eth.defaultAccount = address;
    web3.eth.coinbase = address;

    web3.setProvider(new HookedWeb3Provider( { host: 'http://192.168.0.3:8545', transaction_signer: wallet } ) );

    return wallet;
  }

  function requestFreeEther( addr ) {
    $http.post( 'http://192.168.0.3:8540/appendAddress', { address: '0x'+addr.toString() } );
  };

  return {
    generateAddress: generateAddress,
    storedWalletAvailable: storedWalletAvailable,
    storedWalletRestore: storedWalletRestore,
    requestFreeEther: requestFreeEther
  }
}
