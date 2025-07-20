# select-dom [![][badge-gzip]][link-npm] [![npm downloads][badge-downloads]][link-npm]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/select-dom.svg?label=gzipped
[badge-downloads]: https://img.shields.io/npm/dt/select-dom.svg
[link-npm]: https://www.npmjs.com/package/select-dom

> Lightweight `querySelector`/`All` wrapper that outputs an Array

## Install

```bash
npm install select-dom
```

```js
import {$, $$, lastElement, elementExists} from 'select-dom';

// And a stricter version
import {$, $optional} from 'select-dom/strict.js';
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

### `countElements(selector[, baseElement = document])`

Counts the number of elements found on the page or in the base element. Just a shortcut over `$$(selector).length`

```js
countElements('a');
// => 3
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

## /strict.js

The strict export will throw an error if the element is not found, instead of returning `undefined`. This is also reflected in the types, which are non-nullable:

```ts
import {$, $optional, $$, $$optional} from 'select-dom/strict.js';

const must: HTMLAnchorElement = $('.foo a[href=bar]');
const optional: HTMLAnchorElement | undefined = $optional('.foo a[href=bar]');


const oneOrMore: HTMLAnchorElement[] = $$('.foo a[href=bar]');
const zeroOrMore: HTMLAnchorElement[] = $$optional('.foo a[href=bar]');
```

## Related

- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB.
- [doma](https://github.com/fregante/doma) - Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes.
