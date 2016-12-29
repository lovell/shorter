'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const assert = require('assert');

const shorter = require('../index');

// Verify: fail on invalid input
[undefined, null, 1, true, {}, ''].forEach(function (test) {
  assert.throws(function () {
    shorter.compress(test);
  });
  assert.throws(function () {
    shorter.decompress(test);
  });
});

// Verify: a === decompress(compress(a))
const filename = path.join(__dirname, '..', 'src', 'shoco', 'shoco.c');
readline.createInterface({
  input: fs.createReadStream(filename),
  output: process.stdout,
  terminal: false
}).on('line', function (line) {
  const test = new Buffer(line.trim());
  if (test.length > 0) {
    // Compress/encode
    const encoded = shorter.compress(test);
    assert.strictEqual('object', typeof encoded);
    assert.strictEqual(true, Buffer.isBuffer(encoded));
    assert.strictEqual(true, encoded.length <= test.length);
    // Decompress/decode
    const decoded = shorter.decompress(encoded);
    assert.strictEqual('object', typeof decoded);
    assert.strictEqual(true, Buffer.isBuffer(decoded));
    assert.strictEqual(test.length, decoded.length);
    assert.strictEqual(true, test.equals(decoded));
  }
});
