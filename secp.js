var crypto = require('crypto')
var secp256k1 = require('secp256k1')
// or require('secp256k1/js')
//   if you want to use pure js implementation in node (uses elliptic now)
// or require('secp256k1/elliptic')
//   if implementation that uses elliptic package

// generate message to sign
var msg = crypto.randomBytes(32)

// generate privKey
var privKey

do {
  privKey = crypto.randomBytes(32)
} while (!secp256k1.secretKeyVerify(privKey))

console.log( 'privKey', privKey );

// get the public key in a compressed format
var pubKey = secp256k1.publicKeyCreate(privKey)

console.log( 'pubKey', pubKey );

// sign the message
var sigObj = secp256k1.signSync(msg, privKey)

console.log( sigObj );

// verify the signature
console.log(secp256k1.verifySync( msg, sigObj.signature, pubKey))

console.log(secp256k1.verifySync( msg.fill( 0 ), sigObj.signature, pubKey))
