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

  self.send = function( amount, dest ) {
    // enviar so'ocoins
    var tx = { input: self.getAddress(), amount: amount, dest: dest },
        output = [],
        buf;
    output[0] =  self.key.sign( tx );
    output[1] = tx;

    buf = new Buffer( JSON.stringify(output) );
    console.log(buf.length);
  };

};

util.inherits( Soocoin.wallet, EventEmitter );
util.inherits( Soocoin, Soocoin.wallet );

var wallet = new Soocoin.wallet( { keys: 'admin_keys' } );

wallet.on( 'ready', function() {
  console.info( '-> wallet lista!' );
  console.info( '-> direccion', wallet.getAddress() );

  wallet.send( 100000000, '7xjySUAgyzre2b41PDqKByj9fbknRLvxJ', function() {
    console.log( 'done!' );
  });
});
 
