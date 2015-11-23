#!/usr/bin/env node

var NodeRSA = require( 'node-rsa' ),
    fs = require( 'fs' );

function generateKey() {
  var key = new NodeRSA( { b: 256 } );
};

function loadKeys() {
};

var Server = require( './server' ),
    server = new Server();

// server.start();
