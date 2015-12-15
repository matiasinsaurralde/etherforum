var Web3 = require( 'web3' ),
    web3 = new Web3()

web3.setProvider(new web3.providers.HttpProvider( 'http://localhost:8545' ));

var giveAwayContract = web3.eth.contract( [{"constant":false,"inputs":[],"name":"registerAddress","outputs":[{"name":"addressID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"addressCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"type":"function"}] ).at( '0x20fa4d3e39897e12045d9b52827a991d352a912e' )

function sendEther( to, value, gasPrice, gas, callback ) {
  web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: to,
    value: value,
    gasPrice: gasPrice,
    gas: gas
  }, callback );
};

function giveaway() {
  var count = giveAwayContract.addressCount().c[0]
  console.log( '-> Giveaway round!' );
  console.log( '-> Registered addresses', count );

  var n = 0;
  while( n < count ) {
    var destinationAddress = giveAwayContract.addresses(n),
        amount = parseFloat(Math.random()*10000000);
    console.log( '*> Send', amount, 'ether ->' , destinationAddress );
    sendEther( destinationAddress, amount, 50000000000, 50000, function( err, txhash ) {
      console.log( '>> Sent', amount, 'ether ->', txhash, '(tx)' );
      console.log('');
    });
    n++;
  };
};

giveaway();

setInterval( giveaway, 30000 );
