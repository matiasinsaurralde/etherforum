var crypto = require( 'crypto' );

function pow( item, callback ) {
  var valid = false;

  while( !valid ) {
    item += '0';
    var sha1 = crypto.createHash( 'sha1' ).update( item ).digest('hex'),
        nonce = sha1.slice( 37, 40 );
console.log( nonce );
    if( nonce == '000' ) {
      console.log( 'ok!', nonce, sha1 );
      valid = true;
      callback();
    };
  };
 
};

var transaction = JSON.stringify( { action: 'create_forum', name: 'dsasdds', input: 010201 });

pow( transaction, function() {
  console.log( 'Listo!' );
});
