'use strict';

/* To test:
 *   echo -n <input> | nc localhost 1337
 *
 * Results are <input>:<nonce>
 *
 * Passing e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e should get back
 *   e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e:2c8
 */
var createHash   = require('crypto').createHash
  , createServer = require('net').createServer
  ;

/**
 * Simple proof of work: concatenate the input string with a nonce, returning
 * the nonce when the last 3 digits of the hex-encoded SHA256 hash are '000'.
 * This version calculates the nonce by incrementing a number and converting it
 * to a hex string.
 *
 * @param  String input The starting string.
 * @return String       The computed nonce.
 */
function work(input) {
  var id = 0;
  while (true) {
    var nonce = id.toString(16);

console.log( nonce );

    var sha256 = createHash('sha256');
    sha256.update(input);
    sha256.update(nonce);

    if (sha256.digest('hex').slice(-3) === '000') return nonce;
    else id++;
  }
}

/* Upon connection, server sends 'ok\n' and waits for a packet containing the
 * input. Immediately does work and returns it in the format specified above.
 */
var prover = createServer(function (conn) {
  conn.write('ok\n', function acked() {
    conn.on('readable', function ready() {
      var hash;
      if (!(hash = conn.read())) return;

      conn.write(hash + ':' + work(hash), function done() {
        conn.end();
      });
    });
  });
});

prover.listen(1337, function () {
  console.log('prover up and running on port 1337');
});
