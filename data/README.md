utils/data/
===========

A set of utilities for working with data.


csvToArray
----------

Takes a CSV string, and returns an array of arrays (an array of rows, each of which is an array of cells). Used internally by csvToJson.js.

```js
var csvToArray = require( 'utils/data/csvToArray' );

rows = csvToArray( someCsvData ); // optionally, pass a delimiter as second argument
```


csvToJson
---------

Takes a CSV string, and returns an array of objects. The first non-empty row is used as headers.

```js
var csvToJson = require( 'utils/data/csvToJson' );

records = csvToJson( someCsvData ); // optionally, pass a delimiter as second argument
```


group
-----

Groups an array of objects by a common field.

```js
var group = require( 'utils/data/group' );

itemsByOwner = group([
	{ owner: 'Bob', item: 'Lawnmower' },
	{ owner: 'Sally', item: 'Guitar' },
	{ owner: 'Gertrude', item: 'Chair' },
	{ owner: 'Bob', item: 'Kazoo' }
], 'owner' );

console.log( itemsByOwner.Bob );
// -> [{ owner: 'Bob', item: 'Lawnmower' }, { owner: 'Bob', item: 'Kazoo' };]
```


reindex
-------

Reindexes an array of objects by a common field.

```js
var reindex = require( 'utils/data/reindex' );

countries = [
	{ code: 'AFG', name: 'Afghanistan'    },
	{ code: 'ETH', name: 'Ethiopia'       },
	{ code: 'FRA', name: 'France'         },
	{ code: 'GBR', name: 'United Kingdom' }
];

countryByCode = reindex( countries, 'code' );

console.log( countryByCode.ETH.name ); // -> 'Ethiopia'
```