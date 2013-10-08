/*global define */

define( function () {

	'use strict';

	return function ( array, iterator, context ) {
		var i, len = array.length, originalIterator;

		if ( context ) {
			originalIterator = iterator;
			iterator = function ( value, index, array ) {
				return originalIterator.call( context, value, index, array );
			};
		}

		for ( i = 0; i < len; i += 1 ) {
			if ( iterator( array[i], i, array ) ) {
				return array[i];
			}
		}
	};

});