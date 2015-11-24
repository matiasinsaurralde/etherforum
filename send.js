var Soocoin = require( './soocoin' );

var wallet = new Soocoin.wallet( { keys: 'wallet' } ),
    client = new Soocoin.client(wallet);

wallet.on( 'ready', function() {
  console.info( '(wallet) ready' );
  console.info( '(wallet) address', wallet.getAddress() );

//   wallet.send( 100000000, '7xjySUAgyzre2b41PDqKByj9fbknRLvxJ', function( tx ) {
/*
  wallet.send( 1, '7xjySUAgyzre2b41PDqKByj9fbknRxyxy', function( tx ) {
    client.send( tx );
  });
*/
//  client.create_forum( 'un foro de prueba' );

});
