define( function () {

	'use strict';

	return function ( node ) {
		var bcr = node.getBoundingClientRect();
		return ( bcr.bottom > 0 && bcr.top < window.innerHeight );
	};

});