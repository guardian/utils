define(
[ './csvToArray' ],
function ( csvToArray ) {

	'use strict';

	return function csvToJson ( csv, delimiter, headerRow ) {
		var rows, row, records, record, i, len, j, numHeaders, key, datum, hasData;

		rows = csvToArray( csv, delimiter );

		// find the first non-empty row, and assume it contains headers
		if ( !headerRow ) {
			while ( row = rows.shift() ) {
				i = row.length;
				while ( i-- ) {
					if ( !!row[i] ) {
						headerRow = row;
						numHeaders = headerRow.length;
					}
				}

				if ( headerRow ) {
					break;
				}
			}
		}

		records = [];

		len = rows.length;
		for ( i = 0; i < len; i += 1 ) {
			row = rows[i];
			record = {};

			hasData = false;

			j = headerRow.length;
			while ( j-- ) {
				if ( key = headerRow[j] ) {
					datum = row[j];

					if ( !datum ) {
						continue;
					}

					// try to convert to a number (or whatever else it happens to be)
					try {
						datum = JSON.parse( datum );
					} catch ( err ) {}

					record[ headerRow[j] ] = datum;
					hasData = true;
				}
			}

			if ( hasData ) {
				records[ records.length ] = record;
			}
		}

		return records;
	};

});