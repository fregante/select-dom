'use strict';

/**
 * @param {string} selector   One or more CSS selectors separated by commas
 * @param {Element} [parent]  The element to look inside of
 * @return {?Element}         The element found, if any
 */
function select(selector, parent) {
	return (parent || document).querySelector(selector);
}

/**
 * @param {string} selector   One or more CSS selectors separated by commas
 * @param {Element} [parent]  The element to look inside of
 * @return {boolean}          Whether it's been found
 */
select.exists = function (selector, parent) {
	return Boolean(select(selector, parent));
};

/**
 * @param {string} selector               One or more CSS selectors separated by commas
 * @param {Element|Element[]} [parent]    The element or list of elements to look inside of
 * @return {Element[]}                    An array of elements found
 */
select.all = function (selector, parent) {
	// Can be: select.all('selector') or select.all('selector', singleElementOrDocument)
	if (!parent || typeof parent.querySelectorAll === 'function') {
		return Array.apply(null, (parent || document).querySelectorAll(selector));
	}

	var current;
	var i;
	var ii;
	var all = [];
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
