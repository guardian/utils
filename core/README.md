utils/core/
===========

A set of core utilities.


deepEqual
---------

Returns `true` if the two arguments have deep equality (i.e. if an object or array, they have the same keys with values that also have deep equality), `false` otherwise. Do not use it with cyclical structures!

```js
var deepEqual = require( 'utils/core/deepEqual' );

if ( !deepEqual( cachedData, responseFromServer ) ) {
	updateAllTheThings( responseFromServer );
}
```


events
------

A bog standard events mixin for adding pub/sub capability to any object.

```js
var events = require( 'utils/core/events' );
var extend = require( 'utils/core/extend' );

extend( ObservableThing.prototype, events );
```


extend
------

Add the properties of the `source` objects to the `target` object. Later arguments will override earlier ones.

```js
var extend = require( 'utils/core/extend' );

extend( target, source1, source2, source3 );
```


Promise
-------

A polyfill for DOM Promises, which are coming to browsers in the near future.

```js
var Promise = require( 'utils/core/Promise' );

asyncJob = function ( param ) {
	return new Promise( function ( resolver ) {
		// we do some async stuff then...

		// ...it succeeded
		resolver.resolve( returnValue );

		// ...it borked up
		resolver.reject( error );
	});	
};

asyncJob( 'foo' ).then( function ( result ) {
	doSomethingWith( result );
}).catch( function ( err ) {
	// oh noes!
});
```

state
-----

A mixin for giving objects an observable state.

```js
var state = require( 'utils/core/state' );
var extend = require( 'utils/core/extend' );

extend( StatefulThing.prototype, state );

thing = new StatefulThing();

thing.set( 'foo', 'bar' );
observer = thing.observe( 'foo', function ( newFoo, oldFoo ) {
	alert( 'foo changed from ' + oldFoo + ' to ' + newFoo );
});
thing.set( 'foo', 'baz' ); // alerts 'foo changed from bar to baz'

observer.cancel(); // stop observing 'foo'
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