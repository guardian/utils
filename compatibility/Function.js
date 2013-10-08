/*global define */

define( function ( require ) {

	'use strict';

	//Function.prototype.bind
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				FNOP = function () {
				},
				fBound = function () {
					var scope = (this instanceof FNOP && oThis) ? this : oThis;
					return fToBind.apply(scope, aArgs.concat(Array.prototype.slice.call(arguments)));
				};

			FNOP.prototype = this.prototype;
			fBound.prototype = new FNOP();

			return fBound;
		};
	}

});