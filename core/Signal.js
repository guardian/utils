/*global define */

define(
[],
function () {

	'use strict';

	var Signal = function () {
		this.targets = [];
	};
	
	Signal.prototype = {
		add: function (fun) {
			//only allow a fun to be added once
			this.remove(fun);
			this.targets.push(fun);
		},
		remove: function (fun) {
			var startIndex = 0;
			var index;
			while ((index = this.targets.indexOf(fun, startIndex)) !== -1) {
				this.targets.splice(index, 1);
				startIndex = index;
			}
		},
		trigger: function () {
			var args = Array.prototype.slice.call(arguments, 1);
			var numTargets = this.targets.length;
			for (var i = 0; i < numTargets; ++i) {
				var target = this.targets[i];
				target.call(this, args);
			}
		}
	};

	return Signal;

});