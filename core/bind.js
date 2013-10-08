/*global define */

define(
[],
function () {

	'use strict';

	return function ( fn, context ) {
		var args = Array.prototype.slice.call( arguments, 2 );
		
		return function () {
			fn.apply( context, args.concat( Array.prototype.slice.call( arguments ) ) );
		};
	};

});