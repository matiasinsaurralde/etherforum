var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' );

var Soocoin = {};

Soocoin.wallet = function( params ) {

  var self = this,
      address;

  console.info( '-> inicializando wallet', params );

  if( !fs.existsSync( params.keys ) ) {
    throw new Error( 'Bad keys' );
  };

  fs.readFile( params.keys, function( err, contents ) {
    contents = JSON.parse( contents );
    self.pubKey = contents.public,
    self.privKey = contents.private;

    self.key = new NodeRSA( self.privKey );

    self.emit( 'ready' );
  });

  self.getAddress = function() {
    if( !address ) {
      var sha1 = crypto.createHash( 'sha256' ).update( self.pubKey ).digest('hex'),
          addr = bs58.encode( sha1 );
      self.address = addr.slice( 0, 33 ); // ???
    };
    return self.address;
  };

  self.sign = function( content ) {
    var output = [],
        buf;
    output[0] = self.key.sign( content ).toString( 'hex' );
    output[1] = content;

    buf = new Buffer( JSON.stringify( output ) );

    return buf;
  };

  self.send = function( amount, dest, callback ) {
    var tx = { input: self.getAddress(), amount: amount, dest: dest },
        signedTx = self.sign( tx );

    self.validate( signedTx, callback );

  };

  self.readBlockchain = function() {
    console.log( '-> leer blockchain' );
    fs.readFile( 'blockchain', function( err, data ) {
      console.log(1,err,data);
    });
  };

  self.validate = function( buf ) {
    console.log( '-> validando', buf );
    var tx = JSON.parse( buf );
    // console.log( tx );
    self.readBlockchain();
  };

  self.saveToBlockchain = function() {
  };

};

util.inherits( Soocoin.wallet, EventEmitter );

module.exports = Soocoin;
