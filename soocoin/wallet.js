var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' ),
    secp256k1 = require( 'secp256k1' );

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
    self.publicKey = new NodeRSA( self.pubKey );

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

    content = new Buffer(JSON.stringify(content));

    output[0] = self.key.sign( content ).toString( 'hex' );
    output[1] = content;

var a = new Buffer('asdf');

var firma = self.key.sign( a );

console.log( 'firma', firma );

console.log( 'contenido a firmar', a );

// console.log( 'verificacion', self.publicKey.verify( a, firma ) );

var salida = secp256k1.recoverSync( a, firma, 0 );
console.log( 'secp verificacion', salida );

// console.log( 'verifying - ', self.publicKey.verify( content, output[0] ) );

    buf = new Buffer( JSON.stringify( output ) );

    return buf;
  };

  self.send = function( amount, dest, callback ) {
    var tx = { input: self.getAddress(), amount: amount, dest: dest },
        signedTx = self.sign( tx );

    callback( signedTx );

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
    // self.readBlockchain();
  };

  self.saveToBlockchain = function() {
  };

};

util.inherits( Soocoin.wallet, EventEmitter );

module.exports = Soocoin.wallet;
