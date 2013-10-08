/*global define */

define(
[ './getNode' ],
function ( getNode ) {

	'use strict';

	var init, initing, inited, targets, attach, post;

	init = function () {
		if ( initing || inited ) {
			return;
		}

		initing = true;

		//this will be called after the facebook js has loaded
		var onFBReady = function () {
			var target;

			// init the FB JS SDK
			window.FB.init({
				// channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File for x-domain communication
				// status     : true, // check the login status upon init?
				// cookie     : true, // set sessions cookies to allow your server to access the session?
				// xfbml      : true,  // parse XFBML tags on this page?
				appId: '180444840287' // App ID from the App Dashboard
			});

			initing = false;
			inited = true;

			while ( targets.length ) {
				target = targets.pop();
				attach( target.node, target.options );
			}
		};

		var FB = window.FB;
		
		if ( !FB ) {
			// facebook js needs loading
			var oldfbAsyncInit = window.fbAsyncInit; //preserve any existing fbAsyncInit to call later
			window.fbAsyncInit = function () {
				onFBReady();

				if (oldfbAsyncInit) {
					oldfbAsyncInit();
				}
			};

			// load facebook js
			(function (d, debug) {
				var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement('script');
				js.id = id;
				js.async = true;
				js.src = '//connect.facebook.net/en_US/all' + ( debug ? '/debug' : '' ) + '.js';
				ref.parentNode.insertBefore( js, ref );
			}( document, /*debug*/ false ));
		} else {
			onFBReady();
		}
	};

	targets = [];

	attach = function ( node, options ) {
		node = getNode( node );

		if ( inited ) {
			node.addEventListener( 'click', function () {
				post( options );
			});

			node.style.cursor = 'pointer';
		} else {
			targets.push({ node: node, options: options });
		}
	};

	post = function ( options ) {
		var obj, callback;

		obj = {
			method: 'feed',
			link: options.link,
			picture: options.thumb,
			name: options.title,
			caption: options.caption,
			description: options.description
		};

		callback = function ( response ) {
			var success = response && response.post_id;
			analytics.event( 'sharing', success ? 'fbsharesuccess' : 'fbsharefailure' );
			
			if ( options.callback ) {
				options.callback( success );
			}
		};

		analytics.event( 'sharing', 'clickfbshare' );
		window.FB.ui( obj, callback );
	};

	return function ( node, options ) {
		init();
		attach( node, options );
	};

});