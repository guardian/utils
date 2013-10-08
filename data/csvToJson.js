/*global define */

define(
[ './csvToArray' ],
function ( csvToArray ) {

	'use strict';

	return function ( csv, delimiter, headerRow ) {
		var rows, row, records, record, i, j, headerRow, numHeaders, key, datum;

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

		i = rows.length;
		while ( i-- ) {
			row = rows[i];
			records[i] = record = {};

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
				}
			}
		}

		return records;
	};

	/*data.SpreadsheetArrayToObjects = function(sheetRows, keysRow){
		keysRow = keysRow || 0;

		console.log( 'sheetRows', sheetRows );
		console.log( 'keysRow', keysRow );

		var i;
		var j;
		var row;

		//search until we find a nonempty row, that should be the row with column names
		if(!keysRow){
			for(i = 0; i < sheetRows.length; ++i){
				row = sheetRows[i];
				var rowHasData = false;
				for(j = 0; j < row.length; ++j){
					if(!!row[j]){
						rowHasData = true;
						break;
					}
				}
				if(rowHasData){
					break;
				}
			}
			keysRow = i;
		}

		var result = [];

		var keys = sheetRows[keysRow];

		var numCols = keys.length;
		var numRows = sheetRows.length;

		for(i = keysRow+1; i < numRows; ++i){
			row = sheetRows[i];

			var rowObj = {};
			for(j = 0; j < numCols; ++j){
				var colName = keys[j];
				var value = row[j];

				var floatVal = parseFloat(value);
				if(''+floatVal === ''+value){
					value = floatVal;
				}

				rowObj[j] = value;
				rowObj[colName] = value;
			}

			result.push(rowObj);
		}

		return result;
	};*/

});