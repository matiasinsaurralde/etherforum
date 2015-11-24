var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' ),
    dgram = require( 'dgram' );

const costs = {
  forum_creation: 10000
};

var Soocoin = {};

Soocoin.client = function( wallet ) {
  var self = this,
      socket;

  self.wallet = wallet;

  self.send = function( tx ) {
    console.info( '(client) sending tx', tx );
    socket = dgram.createSocket( 'udp4' );
    socket.send( tx, 0, tx.length, 7777, '127.0.0.1', function( err ) {
      console.info( '(client) err?', err );
      socket.close();
    });
  };

  self.create_forum = function( forumName ) {
    console.info( '(client) create_forum', forumName );
    var tx = { input: self.wallet.getAddress(), forum_name: 'un foro de prueba' },
        signedTx = self.wallet.sign( tx );

    socket = dgram.createSocket( 'udp4' );
    socket.send( signedTx, 0, signedTx.length, 7777, '127.0.0.1', function( err ) {
      console.info( '(client) err?', err );
      socket.close();
    });
  };

  self.readBlockchain = function() {
  };
};

util.inherits( Soocoin.client, EventEmitter );

module.exports = Soocoin.client;
