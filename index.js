'use strict';

/**
 * @param {string} selectors   One or more CSS selectors separated by commas
 * @param {Element} [baseElement]  The element to look inside of
 * @return {?Element}         The element found, if any
 */
function select(selectors, baseElement) {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return null;
	}

	return (baseElement || document).querySelector(selectors);
}

/**
 * @param {string} selectors   One or more CSS selectors separated by commas
 * @param {Element} [baseElement]  The element to look inside of
 * @return {boolean}          Whether it's been found
 */
select.exists = function (selectors, baseElement) {
	if (arguments.length === 2) {
		return Boolean(select(selectors, baseElement));
	}

	return Boolean(select(selectors));
};

/**
 * @param {string} selectors               One or more CSS selectors separated by commas
 * @param {Element|Element[]} [baseElements]    The element or list of elements to look inside of
 * @return {Element[]}                    An array of elements found
 */
select.all = function (selectors, baseElements) {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		return [];
	}

	// Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
	if (!baseElements || typeof baseElements.querySelectorAll === 'function') {
		return new Array(...(baseElements || document).querySelectorAll(selectors));
	}

	const all = [];
	for (let i = 0; i < baseElements.length; i++) {
		const current = baseElements[i].querySelectorAll(selectors);
		for (let ii = 0; ii < current.length; ii++) {
			all.push(current[ii]);
		}
	}

	return [...new Set(all)];
};

module.exports = select;
