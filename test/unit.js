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
  const testString = line.trim();
  const testBuffer = new Buffer(testString);
  if (testString.length > 0) {
    // Compress/encode
    const encodedString = shorter.compress(testString);
    assert.strictEqual('object', typeof encodedString);
    assert.strictEqual(true, Buffer.isBuffer(encodedString));
    assert.strictEqual(true, encodedString.length <= testString.length);
    const encodedBuffer = shorter.compress(testBuffer);
    assert.strictEqual('object', typeof encodedBuffer);
    assert.strictEqual(true, Buffer.isBuffer(encodedBuffer));
    assert.strictEqual(true, encodedBuffer.length <= testBuffer.length);
    assert.strictEqual(true, encodedBuffer.equals(encodedString));
    // Decompress/decode
    const decoded = shorter.decompress(encodedBuffer);
    assert.strictEqual('string', typeof decoded);
    assert.strictEqual(testString.length, decoded.length);
    assert.strictEqual(testString, decoded);
  }
});
