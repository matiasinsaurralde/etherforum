var fs = require( 'fs' ),
    util = require( 'util' ),
    crypto = require( 'crypto' ),
    bs58 = require( 'bs58' ),
    EventEmitter = require( 'events' ),
    NodeRSA = require( 'node-rsa' );

var dgram = require( 'dgram' ),
    async = require( 'async' );

var Soocoin = {};

Soocoin.server = function( params ) {

  var self = this,
      socket = dgram.createSocket( 'udp4' );

  self.blockchain = {};

  self.validationQueue = async.queue( function( item, callback) {
    console.log( '(server/queue) processing tx' );

    if( self.blockchain[ item.tx.id ] ) {
      console.log( '(server/queue) ignoring tx, dup!');
      callback();
    } else {
      self.appendToBlockchain( item.raw, function() {
          self.loadBlockchain();
          callback();
      });
    };
  }, 1);

  self.loadBlockchain = function(callback) {
    console.log( '(server) load blockchain into memory');
    fs.readFile( 'blockchain', function( err, contents ) {
      contents.toString().split( "\n" ).forEach( function( tx, index ) {
        // ignore last line
        if( tx != '' ) {
          var tx = self.parseTx( tx );
          console.log( '(server) loading tx #', index );
          self.blockchain[ tx.id ] = tx.contents;
        };
      });
    });
  };

  self.parseTx = function( rawData ) {
    var tx = JSON.parse( rawData.toString() ),
        txId = tx[0],
        txContents = tx[1];

    return { id: txId, contents: txContents };
  };

  self.appendToBlockchain = function( data, callback ) {
    console.log( '(server) appendToBlockchain', data.length );
    fs.appendFile( 'blockchain', data, function( err ) {
      console.log( '(server) appendToBlockchain ->', err );
      fs.appendFile( 'blockchain', "\n", callback );
    });
  };

  self.start = function() {

    blockchain = self.loadBlockchain();

    socket.bind( 7777, function() {
      console.info( 'Listening @7777' );
    });

    socket.on( 'message', function( rawTx, rinfo ) {
      var tx = self.parseTx( rawTx );
      console.log( '(server)', rinfo, tx );

      console.log( '(server/queue) pushing tx' );

      self.validationQueue.push( { tx: tx,  raw: rawTx} );
      // self.appendToBlockchain( msg );
    });

  };
};

util.inherits( Soocoin.server, EventEmitter );

module.exports = Soocoin.server;
