utils/array/
============


find
----

Returns the first item in an array that passes the `iterator`. Like doing `array.filter( iterator )[0]` except without having to filter the whole damn thing.

```js
define([ 'utils/array/find' ], function ( find ) {
	
	// ...
	
	needle = find( haystack, function ( item, index, haystack ) {
		return isNeedle( item );
	});

	// ...

});
```