var Web3 = require( 'web3' ),
    express = require( 'express' ),
    bodyParser = require('body-parser')
    web3 = new Web3(),
    app = express()

web3.setProvider(new web3.providers.HttpProvider( 'http://localhost:8545' ));

var giveAwayContract = web3.eth.contract( [{"constant":false,"inputs":[],"name":"registerAddress","outputs":[{"name":"addressID","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"foreignAddress","type":"address"}],"name":"registerForeignAddress","outputs":[{"name":"addressID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"addressCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"type":"function"}] ).at('0x437cd5726c971c22860a8218b5fcd6ad0f7f40d8');

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

app.use(bodyParser.urlencoded({ extended: false }))

app.use( function( req, res, next ) {
  res.header( 'Access-Control-Allow-Origin', '* ' );
  next();
});

app.post( '/appendAddress', function( req, res ) {
  var addr = req.body.address;
  console.log( '** Appending address', addr );
  giveAwayContract.registerForeignAddress( '0x0000000000000000000000000000000000000123', { from: web3.eth.coinbase } );
  res.write('');
  res.end();
});

giveaway();

setInterval( giveaway, 60000 );

app.listen( 8540 )
