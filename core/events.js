/*global define */

define(
[ './bind' ],
function ( bind ) {

	'use strict';

	return {
		bind: function (event, callback, context) {
			if (context) {
				callback = bind(callback, context);
			}
			this.eventCallbacks(event).push(callback);
		},
		unbind: function(event, callback){
			//not possible for callbacks with specified contexts at the moment
			var callbacks = this.eventCallbacks(event);
			for (var i = 0; i < callbacks.length;) {
				var cb = callbacks[i];
				if(cb === callback){
					callbacks.splice(i, 1);
				} else {
					++i;
				}
			}
		},
		trigger: function (event) {
			var args = Array.prototype.slice.call(arguments, 1);
			var callbacks = this.eventCallbacks(event);
			var numCallbacks = callbacks.length;
			for (var i = 0; i < numCallbacks; ++i) {
				var callback = callbacks[i];
				callback.apply(this, args);
			}
		},
		eventCallbacks: function (event) {
			var callbacks = this._callbacks || (this._callbacks = {});
			return callbacks[event] || (callbacks[event] = []);
		}
	};

});