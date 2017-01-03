'use strict';

const shorter = require('./build/Release/shorter');

const compress = function compress (input) {
  if (Buffer.isBuffer(input) && input.length > 0) {
    return shorter.compressBuffer(input);
  }
  if (typeof input === 'string' && input.length > 0) {
    return shorter.compressString(input);
  }
  throw new Error('Expected a non-empty Buffer or String');
};

const decompress = function decompress (input) {
  if (Buffer.isBuffer(input) && input.length > 0) {
    return shorter.decompress(input);
  }
  throw new Error('Expected a non-empty Buffer');
};

module.exports = {
  compress: compress,
  decompress: decompress
};
