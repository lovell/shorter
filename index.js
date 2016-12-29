'use strict';

const shorter = require('./build/Release/shorter');

module.exports = {
  compress: function (input) {
    if (Buffer.isBuffer(input) && input.length > 0) {
      return shorter.compress(input);
    }
    throw new Error('Expected a non-empty Buffer');
  },
  decompress: function (input) {
    if (Buffer.isBuffer(input) && input.length > 0) {
      return shorter.decompress(input);
    }
    throw new Error('Expected a non-empty Buffer');
  }
};
