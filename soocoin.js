var fs = require( 'fs' ),
    util = require( 'util' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' );

var Soocoin = function( params ) {
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

};

util.inherits( Soocoin.wallet, EventEmitter );

var wallet = new Soocoin.wallet( { keys: 'admin_keys' } );

wallet.on( 'ready', function() {
  console.log( '-> wallet lista!', wallet );
});
