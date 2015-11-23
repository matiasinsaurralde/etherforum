var dgram = require( 'dgram' );

var Server = function() {
  var s = dgram.createSocket('udp4');
  this.start = function() {
    console.info( 'Server start!' );
    s.bind( 7777, function() {
      console.info( 'Listening @7777' );
    });
  };
};

module.exports = Server;
