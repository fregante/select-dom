'use strict';

function ElementArray(elements) {
	var tmp = Object.create(Array.prototype);
	tmp = (Array.apply(tmp, elements) || tmp);
	// Now extend tmp
	for (var meth in ElementArray.prototype) {
		if (Object.prototype.hasOwnProperty.call(tmp, meth)) {
			tmp[meth] = ElementArray.prototype[meth];
		}
	}
	return tmp;
}

/**
 * Calls el.addEventListener() on all elements of the Array in `this`.
 * All parameters replicate the browser's EventTarget.addEventListener()
 * @param  {string}          type      The event type to listen for
 * @param  {function}        listener  The function to call when the event happens
 * @param  {object|boolean}  options   Characteristics about the event listener, look on mdn: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 * @return {undefined}
 */
ElementArray.prototype.on = function (type, listener, options) {
	this.forEach(function (el) {
		el.addEventListener(type, listener, options);
	});
};

/**
 * Calls el.removeEventListener() on all elements of the Array in `this`.
 * All parameters replicate the browser's EventTarget.removeEventListener()
 * @param  {string}          type      The event type for which to remove an event
 * @param  {function}        listener  The function of the event handler to remove from the event target
 * @param  {object|boolean}  options   Characteristics about the event listener, look on mdn: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#Matching_event_listeners_for_removal
 * @return {undefined}
 */
ElementArray.prototype.off = function (type, listener, options) {
	this.forEach(function (el) {
		el.removeEventListener(type, listener, options);
	});
};

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
	var all;

	// Can be: select.all('selector') or select.all('selector', singleElementOrDocument)
	if (!parent || typeof parent.querySelectorAll === 'function') {
		all = new ElementArray((parent || document).querySelectorAll(selector));
		return all;
	}

	var current;
	var i;
	var ii;
	for (i = 0; i < parent.length; i++) {
		current = parent[i].querySelectorAll(selector);
		if (!all) {
			all = new ElementArray(current);
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
