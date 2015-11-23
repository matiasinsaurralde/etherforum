var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' );

var Soocoin = {};

Soocoin.client = function( params ) {
  var self = this;
  self.send = function( tx ) {
    console.info( '(client) sending tx', tx );
  };
};

util.inherits( Soocoin.client, EventEmitter );

module.exports = Soocoin.client;
