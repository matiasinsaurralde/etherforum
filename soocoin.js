var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' );

var Soocoin = function( params ) {
  this.addressFor = function( pubKey ) {
  };
};

Soocoin.wallet = function( params ) {

  var self = this;

  console.info( '-> inicializando wallet', params );

  if( !fs.existsSync( params.keys ) ) {
    throw new Error( 'Bad keys' );
  };

  fs.readFile( params.keys, function( err, contents ) {
    contents = JSON.parse( contents );
    self.pubKey = contents.public,
    self.privKey = contents.private;
    self.emit( 'ready' );
  });

  self.getAddress = function() {
    var sha1 = crypto.createHash( 'sha256' ).update( self.pubKey ).digest('hex'),
        addr = bs58.encode( sha1 );
    return addr.slice( 0, 33 ); // ???
  };

};

util.inherits( Soocoin.wallet, EventEmitter );

var wallet = new Soocoin.wallet( { keys: 'admin_keys' } );

wallet.on( 'ready', function() {
  console.log( '-> wallet lista!', wallet );
  console.log( '-> direccion', wallet.getAddress() );
});
