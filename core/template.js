/*global define */

define(
[],
function () {

	return function ( template, data ) {
		var substitute = function ( m, subString ) {
			var result;

			eval( 'with(data){result = ' + subString + ' ; }' );
			return result;
		};

		return template.replace( /<%=([\s\S]+?)%>/g, substitute );
	};

});