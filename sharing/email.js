/*global define */

define(
[ './getNode' ],
function ( getNode ) {

	'use strict';

	var getShareUrl = function ( subject, body ) {
		var result = 'mailto:?subject=' + subject;
		
		if ( body ) {
			result += '&body=' + body.replace( /\r?\n/g, '%0D%0A' );
		}

		return result;
	};

	return function ( node, options ) {
		var anchor, url;

		anchor = document.createElement( 'a' );
		url = getShareUrl( options.subject, options.body );

		anchor.href = url;
		anchor.target = '_blank';

		node = getNode( node );

		// wrap node in the anchor
		node.parentNode.insertBefore( anchor, node );
		anchor.appendChild( node );

		anchor.addEventListener( 'click', function ( event ) {
			var width, height, left, top, tops, openedWin;

			analytics.event( 'sharing', 'emshare' );
			
			if ( options.callback ) {
				options.callback();
			}
		});
	};

});