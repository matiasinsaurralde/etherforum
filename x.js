var crypto = require('crypto');

var alice = crypto.createECDH('secp256k1');
var bob = crypto.createECDH('secp256k1');

alice.generateKeys();
bob.generateKeys();

console.log( 'alice private key', alice.getPrivateKey() );
console.log( 'alice pubkey', alice.getPublicKey() );

var signature = crypto.createSign( 'RSA-SHA256' );

var message = new Buffer('el mensaje' );
console.log( 'message', message );
signature.update( message );

console.log( 'privkey', alice.getPrivateKey().toString('base64') );
// console.log( 'signature', signature.sign('hex') );

// var alice_secret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
// var bob_secret = bob.computeSecret(alice.getPublicKey(), null, 'hex');


// alice.generateKeys();
// bob.generateKeys();

// var alice_secret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
// var bob_secret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

