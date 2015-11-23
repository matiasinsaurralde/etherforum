var Soocoin = require( './soocoin' ),
    server = new Soocoin.server( { port: 7777 } );

server.start();
