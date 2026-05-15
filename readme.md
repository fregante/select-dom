# select-dom [![][badge-gzip]][link-npm] [![npm downloads][badge-downloads]][link-npm]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/select-dom.svg?label=gzipped
[badge-downloads]: https://img.shields.io/npm/dt/select-dom.svg
[link-npm]: https://www.npmjs.com/package/select-dom

> Lightweight `querySelector`/`All`/`closest` wrapper that returns an array and optionally throws if elements are not found

## Install

```bash
npm install select-dom
```

```js
import {
	$,
	$$,
	lastElement,
	elementExists,
	assertElementExists,
	$optional,
	$$optional,
	lastElementOptional,
	$closest,
	$closestOptional,
} from 'select-dom';
```

The package also includes an ESLint plugin entry point at `select-dom/eslint-plugin`; [read documentation](#eslint).

## API

**Note:** if a falsy value is passed as `baseElement`, `$`, `$$`, `lastElement` throw `ElementNotFoundError`, while `$optional`, `$$optional`, `lastElementOptional` return `undefined`/`[]` ([bd578b9](https://github.com/fregante/select-dom/commit/bd578b975e35d9f802cb43a900a6d3c83095c76a))

### `$`
### `$optional`

`$` maps to `baseElement.querySelector(selector)`, except it throws `ElementNotFoundError` if no element is found. `$optional` returns `undefined` instead of throwing.

```js
$('.foo a[href=bar]');
// => <Element>

$('.non-existent');
// throws ElementNotFoundError

$optional('.non-existent');
// => undefined
```

### `$$`
### `$$optional`

`$$` maps to `baseElements.querySelectorAll(selector)` and always returns an array. `baseElements` can also be an array of elements to search within. Throws `ElementNotFoundError` if no elements are found. `$$optional` returns `[]` instead of throwing.

```js
$$('.foo');
// => [<Element>, <Element>, <Element>]

$$('.foo', baseElement);
// => [<Element>, <Element>, <Element>]

$$('.foo', [baseElement1, baseElement2]);
// => [<Element>, <Element>, <Element>]

$$('.non-existent');
// throws ElementNotFoundError

$$optional('.non-existent');
// => []
```

### `lastElement`
### `lastElementOptional`

Like `$`/`$optional`, except they return the last matching element instead of the first.

```js
lastElement('.foo');
// => <Element>

lastElement('.non-existent');
// throws ElementNotFoundError

lastElementOptional('.non-existent');
// => undefined
```

### `$closest`
### `$closestOptional`

Like `element.closest(selector)`, except `baseElement` can be any `Node` including text nodes. `$closest` throws `ElementNotFoundError` if not found; `$closestOptional` returns `undefined`.

```js
$closest('button', event.target);
// => <button>

$closest('button', button.firstChild); // text nodes are supported
// => <button>

$closest('.non-existent', element);
// throws ElementNotFoundError

$closestOptional('.non-existent', element);
// => undefined
```

### `elementExists`

Tests the existence of one or more elements. Like `$optional()`, but returns a `boolean`.

```js
elementExists('.foo a[href=bar]');
// => true/false
```

### `assertElementExists`

Like `elementExists()`, but throws `ElementNotFoundError` instead of returning `false`.

```js
assertElementExists('.foo a[href=bar]');
// => void (if element exists)
// => throws ElementNotFoundError (if element doesn't exist)
```

### `countElements`

Counts the number of elements found. Shortcut for `$$optional(selector).length`.

```js
countElements('a');
// => 3
```

## ESLint

`select-dom/eslint-plugin` includes the `select-dom/prefer` rule, which autofixes `.querySelector()`, `.querySelectorAll()`, and `.closest()` calls to the matching `select-dom` helpers.

```js
import selectDom from 'select-dom/eslint-plugin';

export default [
	{
		plugins: {
			'select-dom': selectDom,
		},
		extends: ['select-dom/prefer'],
	},
];
```

By default, the rule reports all supported calls. To keep readability exceptions like `element.firstChild.querySelector(selector)`, enable `allowReadabilityExceptions`.

```js
import selectDom from 'select-dom/eslint-plugin';

export default [
	{
		plugins: {
			'select-dom': selectDom,
		},
		extends: ['select-dom/prefer'],
		rules: {
			'select-dom/prefer': ['error', {
				allowReadabilityExceptions: true,
			}],
		},
	},
];
```

## Related

- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB.
- [doma](https://github.com/fregante/doma) - Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes.
