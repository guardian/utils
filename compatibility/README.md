utils/compatibility/
====================

A set of shims and polyfills (that we probably don't need most of, because we don't support IE8. Right guys?).

You can `require` individual polyfills, or include the whole lot with `require( 'utils/compatibility' )` (make sure you add any new polyfills in this folder to the `compatibility.js` file in the root).


Array
-----

Adds `Array.isArray`, and prototype methods: `map`, `forEach`, `indexOf`.

```js
require( 'utils/compatibility/Array' );
```

Object
------

*coming soon...*


Function
--------

Adds `Function.prototype.bind`.

```js
require( 'utils/compatibility/Function' );
```


Date
----

Adds `Date.now()`.

```js
require( 'utils/compatibility/Date' );
```


requestAnimationFrame
---------------------

Adds an unprefixed `requestAnimationFrame` to `window`, falling back to `setTimeout` where necessary. Returns `requestAnimationFrame` so you don't need to explicity reference `window`.

```js
var raf = require( 'utils/compatibility/requestAnimationFrame' );

var loop = function () {
	raf( loop );	
};

loop();
```

cancelAnimationFrame
--------------------

The yin to `requestAnimationFrame`'s yang. Again, returns the function as well as adding it to `window`.

```js
var caf = require( 'utils/compatibility/cancelAnimationFrame' );
```


addWheelListener
----------------

Adds a normalised cross-browser `addWheelListener` property to `window`.

```js
require( 'utils/compatibility/addWheelListener' );
```

