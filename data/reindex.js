define( function () {

	'use strict';

	return function reindex ( array, idField ) {
		var obj = {}, i, record;

		if ( Object.prototype.toString.call( array ) !== '[object Array]' ) {
			throw new Error( 'Cannot reindex a non-array!' );
		}

		if ( !idField ) {
			throw new Error( 'You must specify an ID field' );
		}

		i = array.length;
		while ( i-- ) {
			record = array[i];
			if ( record.hasOwnProperty( idField ) ) {
				obj[ record[ idField ] ] = record;
			}
		}

		return obj;
	};

});