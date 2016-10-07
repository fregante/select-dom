'use strict';

module.exports = function (selector, parent) {
	return (parent || document).querySelector(selector);
};

module.exports.all = function (selector, parent) {
	// select.all('selector')
	if (!parent) {
		return Array.apply(document.querySelectorAll(selector));
	}
	
	// select.all('selector', singleElementOrDocument)
	if (typeof parent.querySelectorAll === 'function') {
		parent = [parent];
	}
	
	var all = [];
	var current, i, l, ii, ll;
	for (i = 0, l = parent.length; i < l; i++) {
		current = parent[i].querySelectorAll(selector);
		for (ii = 0, ll = current.length; ii < ll; ii++) {
			if (all.indexOf(current[ii]) < 0) {
				all.push(current[ii]);
			}
		}
	}
	return all;
};
