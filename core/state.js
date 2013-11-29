define( function () {

	'use strict';

	var isEqual;

	isEqual = function ( a, b ) {
		// null is a special case as typeof null === 'object'
		if ( a === null && b === null ) {
			return true;
		}

		// if we're dealing with objects, return false as we don't know
		// whether the contents have changed without doing a deep equality
		// check.
		if ( typeof a === 'object' || typeof b === 'object' ) {
			return false;
		}

		return a === b;
	};

	return {
		set: function ( key, value ) {
			var map, oldValue, attributes, callbacks, i, len;

			if ( typeof key === 'object' ) {
				map = key;
				for ( key in map ) {
					if ( map.hasOwnProperty( key ) ) {
						this.set( key, map[ key ] );
					}
				}

				return;
			}

			oldValue = this.get( key );
			if ( !isEqual( value, oldValue ) ) {
				attributes = this._attributes || ( this._attributes = {} );
				attributes[ key ] = value;

				// notify observers
				if ( !this._callbacks ) {
					return;
				}

				if ( !( callbacks = this._callbacks[ key ] ) ) {
					return;
				}

				if ( callbacks.active ) {
					return; // prevent infinite loops
				}

				callbacks.active = true;

				len = callbacks.length;
				for ( i = 0; i < len; i += 1 ) {
					callbacks[i]( value, oldValue );
				}

				callbacks.active = false;
			}

			return this;
		},

		get: function ( key ) {
			if ( !this._attributes ) {
				return undefined;
			}

			return this._attributes[ key ];
		},

		observe: function ( key, callback, options ) {
			var map, allCallbacks, callbacks, observers, i;

			if ( typeof key === 'object' ) {
				map = key;
				options = callback;

				observers = [];

				for ( key in map ) {
					if ( map.hasOwnProperty( key ) ) {
						observers[ observers.length ] = this.observe( key, map[ key ], options );
					}
				}

				return {
					cancel: function () {
						i = observers.length;
						while ( i-- ) {
							observers[i].cancel();
						}
					}
				};
			}

			allCallbacks = this._callbacks || ( this._callbacks = {} );
			callbacks = allCallbacks[ key ] || ( allCallbacks[ key ] = [] );

			callbacks[ callbacks.length ] = callback;

			if ( !options || options.init === false ) {
				callback( this.get( key ) );
			}

			return {
				cancel: function () {
					callbacks.splice( callbacks.indexOf( callback ), 1 );
				}
			};
		}
	};

});