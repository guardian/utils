Guardian Interactive utils
==========================

The purpose of this repo is to keep frequently-used utilities together in such a way that you can bung them all into your project and not worry about whether you use them or not, because the RequireJS optimiser will only include the ones that are actually required.

So instead of this...

```js
define([ 'guiLibs/core' ], function ( core ) {
	core.extend( target, source );
});
```

...we can do this...

```js
define([ 'utils/core/extend' ], function ( extend ) {
	extend( target, source );
});

...and avoid bundling a whole load of extra gubbins that we're not using, just because it happens to share a namespace with something we are.

It might seem like that's a trivial saving, but the point is we can be a lot less conservative about adding new modules that are likely to be reused across projects, without ever having to worry about adding bloat. The plan is to add this to the grunt-gui template in due course.