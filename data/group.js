define( function () {

	'use strict';

	return function group ( array, groupField ) {
		var groups = {}, i, len, groupArray, record, groupName;

		if ( Object.prototype.toString.call( array ) !== '[object Array]' ) {
			throw new Error( 'Cannot group a non-array!' );
		}

		if ( !groupField ) {
			throw new Error( 'You must specify a field to group by' );
		}

		len = array.length;
		for ( i = 0; i < len; i += 1 ) {
			record = array[i];
			
			if ( groupName = record[ groupField ] ) {
				groupArray = groups[ groupName ] || ( groups[ groupName ] = [] );
				groupArray[ groupArray.length ] = record;
			}
		}

		return groups;
	};

});