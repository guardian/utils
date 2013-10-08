/*global define, window, document */
define( function () {
	
	'use strict';

	var analytics = function () {
	};

	/**
	 *
	 * @param {string} category
	 * @param {string} action
	 * @param {string} [opt_label]
	 * @param {number} [opt_value]
	 * @param {string} [opt_noninteraction]
	 */
	analytics.event = function (category, action, opt_label, opt_value, opt_noninteraction) {
		var args = [].splice.call(arguments, 0);
		args.splice(0, 0, '_trackEvent');
		gaPush.apply(null, args);
	};

	/**
	 *
	 * @param {string} url
	 */
	analytics.pageView = function (url) {
		var args = [].splice.call(arguments, 0);
		args.splice(0, 0, '_trackPageview');
		gaPush.apply(null, args);
	};

	/**
	 *
	 * @param {string} gaid
	 */
	analytics.loadGA = function (gaid) {

		gaTrackerName = 'guiTracker' + (new Date().getTime());

		var gaLoadComplete = function () {
			gaTracker = window._gat._createTracker(gaid, gaTrackerName);

			//process any events that happened while loading
			var q = gaQueue;
			gaQueue = [];
			for (var i = 0; i < q.length; ++i) {
				gaPush.apply(null, q[i]);
			}

			gaPush('_trackPageview');
		};

		gaGetStack().push(gaLoadComplete);

		(function () {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
	};


	//GA state and internal stuff
	var gaTracker = null;
	var gaQueue = [];
	var gaTrackerName = '';
	var gaPush = function () {
		var args = [].splice.call(arguments, 0);
		if (gaTracker) {
			//tracker is loaded!
			args[0] = gaTrackerName + "." + args[0];//make this event refer to our particular tracker
			gaGetStack().push(args);
		} else {
			gaQueue.push(args);
		}
	};
	var gaGetStack = function () {
		return window._gaq || ( window._gaq = []);

	};

	return analytics;

});