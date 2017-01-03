# shorter

Node.js module to very quickly (de)compress short strings.

Uses the SIMD-powered entropy encoding features of
[Christian Schramm](https://github.com/Ed-von-Schleck)'s
[shoco](http://ed-von-schleck.github.io/shoco/).

Encodes ASCII-compatible characters (`0x00` to `0x7F`)
whilst maintaining full UTF-8 support.

The byte length of the compressed output
will never exceed the byte length of the input.

Works well with strings up to around 100 characters
and is particularly well-suited to e-mail addresses and URLs.

Compression and decompression is typically 10x faster than zlib deflate.

## Installation

```
npm install shorter
```

## Usage

```javascript
const shorter = require('shorter');
```

```javascript
const encoded = shorter.compress('test');
console.log(Buffer.isBuffer(encoded)); // true
console.log(encoded.length);           // 2
console.log(encoded.toString('hex'));  // 'c899'
```

```javascript
const encoded = shorter.compress(Buffer.from('test'));
console.log(Buffer.isBuffer(encoded)); // true
console.log(encoded.length);           // 2
console.log(encoded.toString('hex'));  // 'c899'
```

```javascript
const decoded = shorter.decompress(Buffer.from('c899', 'hex'));
console.log(typeof decoded); // 'string'
console.log(decoded.length); // 4
console.log(decoded);        // 'test'
```

## API

### compress(input)

* `input` is the `Buffer` or `String` to compress.

Returns the compressed/encoded `Buffer`.

### decompress(input)

* `input` is the `Buffer` to decompress.

Returns the decompressed/decoded `String`.

## Testing

[![Build Status](https://travis-ci.org/lovell/shorter.png?branch=master)](https://travis-ci.org/lovell/shorter)

```
npm test
```

## Licence

Copyright 2016, 2017 Lovell Fuller

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
