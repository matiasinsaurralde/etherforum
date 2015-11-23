var createKeys = require('rsa-json'),
    fs = require( 'fs' );

createKeys( {}, function( a, b ) {
  fs.writeFile( 'god_keys', JSON.stringify(b) );
});
