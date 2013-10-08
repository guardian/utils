/*global define */

define( function () {

	'use strict';

	// Do not call this with cyclical structures!

	return function deepEqual ( a, b ) {
		var i, keys;

		if ( a === null && b === null ) {
			return true;
		}

		if ( typeof a === 'object' ) {
			if ( typeof b !== 'object' ) {
				return false;
			}

			if ( Array.isArray( a ) ) {
				if ( !Array.isArray( b ) ) {
					return false;
				}

				if ( a.length !== b.length ) {
					return false;
				}

				while ( i-- ) {
					if ( !deepEqual( a[i], b[i] ) ) {
						return false;
					}
				}

				return true;
			}

			keysA = Object.keys( a );
			keysB = Object.keys( b );

			if ( !deepEqual( keysA, keysB ) ) {
				return false;
			}

			i = keysA.length

			while ( i-- ) {
				if ( !deepEqual( a[ keysA[i] ], b[ keysA[i] ] ) ) {
					return false;
				}
			}

			return true;
		}

		return a === b;
	};

});