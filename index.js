'use strict';

function getElementsArray (elements) {
	if (!elements) {
		return [];
	}
	// some elements are array-like (<form> has a .length) so they need to be stopped here
	if (elements instanceof HTMLElement || elements === document) {
		return [elements];
	}
	if (Array.isArray(elements)) {
		return elements;
	}
	if (Array.from) {
		return Array.from(elements);
	}
	return Array.prototype.slice.call(elements);
}

module.exports = function (selector, parent) {
	return (parent || document).querySelector(selector);
};

module.exports.all = function (selector, parent) {
	var current, i, l, ii, ll;
	if (!parent) {
		return getElementsArray(document.querySelectorAll(selector));
	}
	parent = getElementsArray(parent || document);
	var all = [];
	for (i = 0, l = parent.length; i < l; i++) {
		current = parent[i].querySelectorAll(selector);
		for (ii = 0, ll = current.length; ii < ll; ii++) {
			if (all.indexOf(current[ii]) === -1) {
				all.push(current[ii]);
			}
		}
	}
	return all;
};