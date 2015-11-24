var crypto = require( 'crypto' );

var lastBlock = new Buffer( '000000000000000004393fab2d328849f390df0848d0dfab0d846e18be00fe3e', 'hex'),
    lastMerkleRoot = new Buffer( 'b2d24fced20a5bf7910209581d2e10323e3dfe7d2d0dd1244acbc21724644eea', 'hex' );

const version = '01000000',
//      target = new Buffer( '000000000000000101393fab2d328849f390df0848d0dfab0d846e18be00fe3e' );
      target = new Buffer( '0000000000000083ef00000000000000000000000000000000000000000000000' );

function swapBytes(buffer) {
  var l = buffer.length;
  if (l & 0x01) {
    throw new Error('Buffer length must be even');
  }
  for (var i = 0; i < l; i += 2) {
    var a = buffer[i];
    buffer[i] = buffer[i+1];
    buffer[i+1] = a;
  }
  return buffer; 
};

function buildNextBlock( transactions ) {

  var buf = [ new Buffer(lastBlock ) ],
      header,
      hash,
      nonce = 0,
      iterations = 0,
      valid = false;

  transactions.forEach( function( t ) {
    buf.push( new Buffer( t ) );
  });

  header = Buffer.concat( buf );

  while( !valid ) {
    var nonceHeader = Buffer.concat( [ header, new Buffer(nonce) ] );
    hash = crypto.createHash( 'sha256' ).update( nonceHeader ).digest();
    if( hash < target ) {
      // console.log( 'hash > target after', iterations, 'iterations', 'nonce ->', nonce );
      // console.log( 'hash', hash, 'target', target );
      // valid = true;
    };
    /*
    if( hash[0] == 0 && hash[1] == 0 ) {
      console.log( 'got first leading zero w/ nonce', nonce );
    };
    */
    iterations++;
    nonce++;
  };
};

var newTransactions = [ '5572eca4dd4', 'db7d0c0b845', '916d849af76' ];
buildNextBlock( newTransactions, function() {
  console.log( 'next block ready!' );
});
