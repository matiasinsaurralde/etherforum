var Soocoin = require( './soocoin' );

console.log( 123, Soocoin );

var wallet = new Soocoin.wallet( { keys: 'admin_keys' } );

wallet.on( 'ready', function() {
  console.info( '-> wallet lista!' );
  console.info( '-> direccion', wallet.getAddress() );

  wallet.send( 100000000, '7xjySUAgyzre2b41PDqKByj9fbknRLvxJ', function() {
    console.log( 'done!' );
  });
});
