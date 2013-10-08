/*global define */

define( function ( require ) {

	'use strict';

	var requestAnimationFrame = require( '../compatibility/requestAnimationFrame' );

	return function ( callback ) {
		var loop = function(){
			requestAnimationFrame( loop );
			callback();
		};
		
		loop();
	};

});