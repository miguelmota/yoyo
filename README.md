# Yoyo

Yoyo is a tiny [trampoline](http://en.wikipedia.org/wiki/Trampoline_(computing) (iteratively invokes [thunk](http://en.wikipedia.org/wiki/Thunk_(functional_programming))-returning functions) library with partial application support.

# Install

    Available via [bower]():

    ```bash
    bower install yoyo
    ```

    Available via [npm]():

    ```bash
    npm install yoyojs
    ```

# Usage

    Factorial example:

    ```javascript
var yoyo = require('yoyojs');

function factorial(n, acc) {
  if (n < 2){
    return acc;
  }
  return fac.bind(null, n-1, n * acc);
}

yoyo(factorial, 3,1); // 6
yoyo(factorial)(3,1); // 6
yoyo(factorial)(3)(1); // 6
```

Is even/odd example:

```javascript
var yoyo = require('yoyojs');

function even(n) {
  return n === 0 ? true : odd.bind(null, n - 1);
}

function odd(n) {
  return n === 0 ? false : even.bind(null, n - 1);
}

yoyo(even, 2); // true
yoyo(even)(2); // true
```

# Why

Without trampolining, a new stack frame is created on each iteration call and thus overflowing the maximum call stack size:

```bash
function fac(n, acc) {
  if (n < 2){
    return acc;
  }
  return fac(n-1, n * acc);
}

fac(30000, 1);

Failures:

  1) Yoyo Should return fail with stackoverflow
    Message:
        RangeError: Maximum call stack size exceeded

    Stacktrace:
      undefined
```

With trampolining, there is not a new stack created because of tail-call elimation, meaning that after each iteration the result is returned and the trampoline takes care of calling it again with the new result if the returned result is thunk.

```bash
function fac(n, acc) {
  if (n < 2){
    return acc;
  }
  return fac.bind(n-1, n * acc);
}

yoyo(fac(30000, 1));

Infinity
```

For large values, you can use the [BigInteger](https://github.com/peterolson/BigInteger.js) library.

# Test

```bash
npm test
```

# Credits

[JavaScript Allongé](https://leanpub.com/javascript-allonge/read) by Reg "Raganwald" Braithwaite.

# License

Released under the MIT License.
