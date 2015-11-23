var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' );

var Soocoin = {};

Soocoin.server = function( params ) {
  var self = this;
};

util.inherits( Soocoin.server, EventEmitter );

module.exports = Soocoin.server;
