# select-dom [![][badge-gzip]][link-npm] [![npm downloads][badge-downloads]][link-npm]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/select-dom.svg?label=gzipped
[badge-downloads]: https://img.shields.io/npm/dt/select-dom.svg
[link-npm]: https://www.npmjs.com/package/select-dom

> Lightweight `querySelector`/`All` wrapper that outputs an Array

Version 7+ only supports browsers with [iterable `NodeList`s](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/entries). If you need IE support, stick to [`select-dom@6`](https://github.com/fregante/select-dom/tree/v6.0.4) or lower.

## Install

```bash
npm install select-dom
```

```js
// This module is only offered as a ES Module
import {$, $$, lastElement, elementExists} from 'select-dom';
```

## API

**Note:** if a falsy value is passed as `baseElement`, you'll always get an empty result ([bd578b9](https://github.com/fregante/select-dom/commit/bd578b975e35d9f802cb43a900a6d3c83095c76a))

### `$(selector[, baseElement = document])`

Maps to `baseElement.querySelector(selector)`, except it returns `undefined` if it's not found

```js
$('.foo a[href=bar]');
// => <Element>

$('.foo a[href=bar]', baseElement);
// => <Element>

$('.non-existent', baseElement);
// => undefined
```

### `lastElement(selector[, baseElement = document])`

Like `$()`, except that it returns the last matching item on the page instead of the first one.

### `elementExists(selector[, baseElement = document])`

Tests the existence of one or more elements matching the selector. It's like `$()`, except it returns a `boolean`.

```js
elementExists('.foo a[href=bar]');
// => true/false

elementExists('.foo a[href=bar]', baseElement);
// => true/false
```

### `$$(selector[, baseElements = document])`

Maps to `baseElements.querySelectorAll(selector)` plus:

- it always returns an array
- `baseElements` can be a list of elements to query

```js
$$('.foo');
// => [<Element>, <Element>, <Element>]

$$('.foo', baseElement);
// => [<Element>, <Element>, <Element>]

$$('.foo', [baseElement1, baseElement2]);
// => [<Element>, <Element>, <Element>]
// This is similar to jQuery([baseElement1, baseElement2]).find('.foo')
```

## Related

- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB.
- [doma](https://github.com/fregante/doma) - Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes.
