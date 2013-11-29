define([ '../core/Promise' ], function ( Promise ) {

	'use strict';

	return function ( url, onsuccess, onerror ) {
		var resolver, xhr, promise;

		if ( !onsuccess ) {
			promise = new Promise( function ( r ) {
				resolver = r;
			});
		}

		xhr = new XMLHttpRequest();
		
		xhr.onload = function () {
			if ( resolver ) {
				resolver.resolve( xhr.responseText );
			} else {
				onsuccess( xhr.responseText );
			}
		};

		xhr.onerror = function () {
			if ( resolver ) {
				resolver.reject( xhr.statusText, xhr.status );
			} else if ( onerror ) {
				onerror( xhr.statusText, xhr.status );
			}
		};

		xhr.open( 'GET', url );
		xhr.send();

		return promise;
	};

});