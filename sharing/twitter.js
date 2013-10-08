/*global define */

define(
[ './getNode', '../analytics' ],
function ( getNode, analytics ) {

	'use strict';

	var getShareUrl;

	getShareUrl = function ( text, url, via ) {
		var result = "http://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
		
		if (via) {
			result += '&via=' + encodeURIComponent(via);
		}
		
		if (url) {
			result += "&url=" + encodeURIComponent(url);
		}

		return result;
	};

	return function ( node, options ) {
		var anchor, url;

		anchor = document.createElement( 'a' );
		url = getShareUrl( options.message, options.url, options.via );

		anchor.href = url;
		anchor.target = '_blank';
		anchor.className = 'twitter-share-button';
		anchor.setAttribute( 'data-text', options.message );
		anchor.setAttribute( 'data-lang', 'en' );
		anchor.setAttribute( 'data-count', 'none' );

		node = getNode( node );

		// wrap node in the anchor
		node.parentNode.insertBefore( anchor, node );
		anchor.appendChild( node );

		anchor.addEventListener( 'click', function ( event ) {
			var width, height, left, top, tops, openedWin;

			analytics.event( 'sharing', 'twshare' );
			
			if ( options.callback ) {
				options.callback();
			}

			width  = 600;
			height = 450;
			left   = ( window.innerWidth  - width  ) / 2;
			top    = ( window.innerHeight - height ) / 2;
			opts   = 'status=1' + ',width=' + width  + ',height=' + height + ',top=' + top + ',left='   + left;

			openedWin = window.open( url, 'twitter', opts );
			if ( openedWin ) {
				event.preventDefault();
			}
		});
	};

});