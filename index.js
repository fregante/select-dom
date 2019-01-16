'use strict';

/**
 * @param {string} selector   One or more CSS selectors separated by commas
 * @param {Element} [parent]  The element to look inside of
 * @return {?Element}         The element found, if any
 */
function select(selector, parent) {
	// Shortcut with specified-but-null parent
	if (arguments.length === 2 && !parent) {
		return null;
	}

	return (parent || document).querySelector(selector);
}

/**
 * @param {string} selector   One or more CSS selectors separated by commas
 * @param {Element} [parent]  The element to look inside of
 * @return {boolean}          Whether it's been found
 */
select.exists = function (selector, parent) {
	if (arguments.length === 2) {
		return Boolean(select(selector, parent));
	}

	return Boolean(select(selector));
};

/**
 * @param {string} selector               One or more CSS selectors separated by commas
 * @param {Element|Element[]} [parent]    The element or list of elements to look inside of
 * @return {Element[]}                    An array of elements found
 */
select.all = function (selector, parent) {
	// Shortcut with specified-but-null parent
	if (arguments.length === 2 && !parent) {
		return [];
	}

	// Can be: select.all('selector') or select.all('selector', singleElementOrDocument)
	if (!parent || typeof parent.querySelectorAll === 'function') {
		return Array.apply(null, (parent || document).querySelectorAll(selector));
	}

	var current;
	var i;
	var ii;
	var all;
	for (i = 0; i < parent.length; i++) {
		current = parent[i].querySelectorAll(selector);
		if (!all) {
			all = Array.apply(null, current);
			continue;
		}

		for (ii = 0; ii < current.length; ii++) {
			if (all.indexOf(current[ii]) < 0) {
				all.push(current[ii]);
			}
		}
	}

	return all;
};

module.exports = select;
