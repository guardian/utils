/*global define */

define( function () {

	'use strict';

	//window.addWheelListener
	// creates a global "addwheelListener" method
	// example: addWheelListener( elem, function( e) { console.log( e.deltaY); e.preventDefault(); });

	var prefix = "", _addEventListener, onwheel, support;

	// detect event model
	if (window.addEventListener) {
		_addEventListener = "addEventListener";
	} else {
		_addEventListener = "attachEvent";
		prefix = "on";
	}

	// detect available wheel event
	support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
		document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
			"DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

	window.addWheelListener = function (elem, callback, useCapture) {
		_addWheelListener(elem, support, callback, useCapture);

		// handle MozMousePixelScroll in older Firefox
		if (support == "DOMMouseScroll") {
			_addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
		}
	};

	function _addWheelListener(elem, eventName, callback, useCapture) {
		elem[ _addEventListener ](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
			if (!originalEvent) {
				(originalEvent = window.event);
			}

			var originalHasDeltaMode = originalEvent.hasOwnProperty('deltaMode');
			// create a normalized event object
			var event = {
				// keep a ref to the original event object
				originalEvent: originalEvent,
				target: originalEvent.target || originalEvent.srcElement,
				type: "wheel",
				deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
				deltaX: 0,
				deltaZ: 0,
				preventDefault: function () {
					if(originalEvent.preventDefault){
						originalEvent.preventDefault();
					} else {
						originalEvent.returnValue = false;
					}
				}
			};
			var lineHeight = 40;

			// calculate deltaY (and deltaX) according to the event
			if (support == "mousewheel") {
				event.deltaY = -1 / lineHeight * originalEvent.wheelDelta;
				if(originalEvent.wheelDeltaX){
					event.deltaX = -1 / lineHeight * originalEvent.wheelDeltaX;
				}

			} else {
				event.deltaY = originalEvent.detail;
			}

			// it's time to fire the callback
			return callback(event);

		}, useCapture || false);
	}

});