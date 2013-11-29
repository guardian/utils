define([ '../core/Promise' ], function ( Promise ) {

	'use strict';

	return function ( src ) {
		return new Promise( function ( resolver ) {
			var img = new Image();

			img.onload = function () {
				resolver.resolve( img );
			};

			img.onerror = function () {
				resolver.reject( img );
			};

			img.src = src;
		});
	};

});