define( function () {

	'use strict';

	return function ( target ){
		var i, source, key;

		for ( i = 1; i < arguments.length; i += 1 ) {
			source = arguments[i];
			
			for ( key in source ) {
				if ( source.hasOwnProperty( key ) ) {
					target[ key ] = source[ key ];
				}
			}
		}
		return target;
	};

});