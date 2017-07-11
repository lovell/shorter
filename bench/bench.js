'use strict';

const Benchmark = require('benchmark');
const zlib = require('zlib');
const smaz = require('smaz');
const shorter = require('../index');

const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum arcu ante, nec elementum mauris consequat eget. Vestibulum blandit quis urna vitae pharetra. Nullam et iaculis risus. Duis tincidunt diam nibh, a facilisis nibh semper eget. Sed nisi dolor, dapibus tristique arcu quis, pellentesque iaculis tortor. Sed quis semper massa. Suspendisse venenatis faucibus justo, sed hendrerit elit fermentum et. Quisque erat lorem, efficitur sit amet semper non, vulputate ut sapien. Donec massa nunc.';

const deflateRawSync = function (input, level) {
  return zlib.deflateRawSync(input, { level });
};

[10, 50, 100, 500].forEach(function (length) {
  console.log(`Original ${length}`);

  const inputString = input.substring(0, length);
  const inputBuffer = Buffer.from(inputString);

  // Compressed length
  [1, 6, 9].forEach(function (level) {
    const deflated = deflateRawSync(inputString, level);
    console.log(`deflate${level} ${deflated.length}`);
  });
  const smazed = smaz.compress(inputString);
  console.log(`smaz     ${smazed.length}`);
  const shortened = shorter.compress(inputString);
  console.log(`shorter  ${shortened.length}`);

  // Compression performance
  (new Benchmark.Suite())
  .add('deflate level 6 string', function () {
    deflateRawSync(inputString, 6);
  })
  .add('deflate level 6 buffer', function () {
    deflateRawSync(inputBuffer, 6);
  })
  .add('deflate level 9 string', function () {
    deflateRawSync(inputString, 9);
  })
  .add('deflate level 9 buffer', function () {
    deflateRawSync(inputBuffer, 9);
  })
  .add('smaz string', function () {
    smaz.compress(inputString);
  })
  .add('shorter string', function () {
    shorter.compress(inputString);
  })
  .add('shorter buffer', function () {
    shorter.compress(inputBuffer);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  }).run();
});
