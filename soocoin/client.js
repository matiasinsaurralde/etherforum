var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' ),
    dgram = require( 'dgram' );

var Soocoin = {};

Soocoin.client = function( params ) {
  var self = this,
      socket;

  self.send = function( tx ) {
    console.info( '(client) sending tx', tx );
    socket = dgram.createSocket( 'udp4' );
    socket.send( tx, 0, tx.length, 7777, '127.0.0.1', function( err ) {
      console.info( '(client) err?', err );
      socket.close();
    });
  };
  self.readBlockchain = function() {
    
  };
};

util.inherits( Soocoin.client, EventEmitter );

module.exports = Soocoin.client;
