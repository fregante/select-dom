'use strict';

function select (selector, parent) {
	return (parent || document).querySelector(selector);
}

select.exists = function (selector, parent) {
	return Boolean(select(selector, parent));
};

select.all = function (selector, parent) {
	// select.all('selector') or select.all('selector', singleElementOrDocument)
	if (!parent || typeof parent.querySelectorAll === 'function') {
		return Array.apply(null, (parent || document).querySelectorAll(selector));
	}

	var all = [];
	var current, i, ii;
	for (i = 0; i < parent.length; i++) {
		current = parent[i].querySelectorAll(selector);
		for (ii = 0; ii < current.length; ii++) {
			if (all.indexOf(current[ii]) < 0) {
				all.push(current[ii]);
			}
		}
	}
	return all;
};


module.exports = select;
