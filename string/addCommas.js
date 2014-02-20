define( function () {

	'use strict';

	return function ( num ) {
		return num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
	};

});
