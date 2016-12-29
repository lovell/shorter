# shorter

Node.js module to very quickly compress short strings.

Uses SIMD and the entropy encoding features of
[Christian Schramm](https://github.com/Ed-von-Schleck)'s
[shoco](http://ed-von-schleck.github.io/shoco/).

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
console.log(encoded); // 'ș'
```

```javascript
const encoded = shorter.compress(new Buffer('test'));
console.log(encoded); // 'ș'
```

```javascript
const decoded = shorter.decompress('ș');
console.log(decoded); // 'test'
```

```javascript
const decoded = shorter.decompress(new Buffer('ș'));
console.log(decoded); // 'test'
```

## API

### compress(input)

* `input` is the Buffer or String to compress.

Returns the compressed/encoded String.

#### decompress(input)

* `input` is the Buffer or String to decompress.

Returns the decompressed/decoded String.

## Testing

[![Build Status](https://travis-ci.org/lovell/shorter.png?branch=master)](https://travis-ci.org/lovell/shorter)

```
npm test
```

## Licence

Copyright 2016 Lovell Fuller

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
