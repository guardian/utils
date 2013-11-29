define(
[],
function () {

	'use strict';

	return function ( node ) {
		if ( !node ) {
			throw new Error( 'No target specified' );
		}

		if ( node.nodeType === 1 ) {
			return node;
		}

		if ( node.length && node[0].nodeType === 1 ) {
			return node[0];
		}

		throw new Error( 'Invalid target specified' );
	};

});