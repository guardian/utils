utils/core/
===========

A set of core utilities.


deepEqual
---------

Returns `true` if the two arguments have deep equality (i.e. if an object or array, they have the same keys with values that also have deep equality), `false` otherwise.

```js
var deepEqual = require( 'utils/core/deepEqual' );

if ( !deepEqual( cachedData, responseFromServer ) ) {
	updateAllTheThings( responseFromServer );
}
```


extend
------

Add the properties of the `source` objects to the `target` object. Later arguments will override earlier ones.

```js
var extend = require( 'utils/core/extend' );

extend( target, source1, source2, source3 );
```


events
------

A bog standard events mixin for adding pub/sub capability to any object.

```js
var events = require( 'utils/core/events' );
var extend = require( 'utils/core/extend' );

extend( ObservableThing.prototype, events );
```


template
--------

Render a template containing `<%= someVar %>` tags;

```js
var template = require( 'utils/core/template' );

// render 'hello world'
var rendered = template( '<% greeting %> <%= thing %>', { greeting: 'hello', thing: 'world' });
```


uid
---

Returns a unique identifier, optionally namespaced.


```js
var uid = require( 'utils/core/uid' );

uid(); // 0
uid(); // 1

uid( 'foo' ); // foo_0
uid( 'foo' ); // foo_1
```