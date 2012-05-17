[![Build Status](https://secure.travis-ci.org/vesln/b.png)](http://travis-ci.org/vesln/b)

# B - Benchmarks for Node.js

## Description

B is small and elegant module for Node.js that makes benchmarking fun.
	
## Features

- Async & sync benchmarks
- Streams
- Reporters

## Synopsis

### Synchronous

```js
var b = require('b');

b('Synchronous benchmark').run(100, function() {
  for (var i = 0, len = 1000000; ++i < len;) {
    // do stuff
  }
});
```

### Asynchronous

```js
var b = require('b');

b('Asynchronous benchmark').run(10, function(done) {
  // do stuff
  done();
});
```

### Build your reporter

```js
function Reporter() {};

Reporter.prototype.report = function(name, result, iterations) {
  // report it
};

b('Custom reporter')
  .reporter(new Reporter)
  .run(10, function() {
    // benchmark stuff
  });
```

## Requirements

- NPM (http://npmjs.org/)
- Node.js 0.6 (http://nodejs.org/)

## Install

```
$ npm install b
```

## Tests

```
$ npm install
$ make test
```

## License

MIT License

Copyright (C) 2012 Veselin Todorov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
