define(
[],
function () {

	'use strict';

	return function ( s, minLength, padChar, append ) {
		if ( padChar === undefined ) {
			padChar = '0';
		}

		s = '' + s;
		if ( append ) {
			while ( s.length < minLength ) {
				s += padChar;
			}
		}

		else {
			while ( s.length < minLength ) {
				s = padChar + s;
			}
		}

		return s;
	};

});