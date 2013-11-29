define( function () {

	'use strict';

	return {
		bind: function (event, callback) {
			this.eventCallbacks(event).push(callback);
		},

		unbind: function ( event, callback ) {
			var callbacks, i;

			callbacks = this.eventCallbacks( event );

			i = callbacks.length;
			while ( i-- ) {
				if ( callbacks[i] === callback ) {
					callbacks.splice( i, 1 );
				}
			}
		},

		trigger: function ( event ) {
			var args, callbacks, numCallbacks, i, callback;
			
			args = Array.prototype.slice.call( arguments, 1 );

			callbacks = this.eventCallbacks(event);
			numCallbacks = callbacks.length;

			for ( i = 0; i < numCallbacks; ++i ) {
				callback = callbacks[i];
				callback.apply( this, args );
			}
		},

		eventCallbacks: function ( event ) {
			var callbacks = this._callbacks || ( this._callbacks = {} );
			return callbacks[ event ] || ( callbacks[ event ] = [] );
		}
	};

});