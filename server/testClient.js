#!/usr/bin/env node
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000/dashboard');

ws.on('open', function open() {
  ws.send('I am the client');
});

ws.on('message', function(data, flags) {
    console.log(data);
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
});