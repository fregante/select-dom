# select-dom [![gzipped size][badge-gzip]](#no-link) [![Travis build status][badge-travis]][link-travis] [![npm downloads][badge-downloads]][link-npm]

  [badge-gzip]: https://img.shields.io/bundlephobia/minzip/select-dom.svg?label=gzipped
  [badge-travis]: https://api.travis-ci.org/bfred-it/select-dom.svg
  [badge-downloads]: https://img.shields.io/npm/dt/select-dom.svg
  [link-travis]: https://travis-ci.org/bfred-it/select-dom
  [link-npm]: https://www.npmjs.com/package/select-dom

> Lightweight `querySelector`/`All` wrapper that outputs an Array

Version 5+ only supports browsers with [`Set` support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Browser_compatibility). If you need IE 10- support, stick to [`select-dom@4`](https://github.com/bfred-it/select-dom/tree/v4.2.2)

## Install

```bash
$ npm install select-dom
```

```js
const select = require('select-dom')
```

```js
import select from 'select-dom';
```


## API

**Note:** if a falsy value is passed as `baseElement`, you'll always get an empty result ([bd578b9](https://github.com/bfred-it/select-dom/commit/bd578b975e35d9f802cb43a900a6d3c83095c76a))

### `select(selector[, baseElement = document])`

Maps to `baseElement.querySelector(selector)`

```js
select('.foo a[href=bar]')
// => <Element>

select('.foo a[href=bar]', baseElement)
// => <Element>
```

### `select.exists(selector[, baseElement = document])`

Tests the existence of one or more elements matching the selector. It's like `select()`, except it returns a `boolean`.

```js
select.exists('.foo a[href=bar]')
// => true/false

select.exists('.foo a[href=bar]', baseElement)
// => true/false
```

### `select.all(selector[, baseElements = document])`

Maps to `baseElements.querySelectorAll(selector)` plus:

* it always returns an array
* `baseElements` can be a list of elements to query

```js
select.all('.foo')
// => [<Element>, <Element>, <Element>]

select.all('.foo', baseElement)
// => [<Element>, <Element>, <Element>]

select.all('.foo', [baseElement1, baseElement2])
// => [<Element>, <Element>, <Element>]
// This is similar to jQuery([baseElement1, baseElement2]).find('.foo')
```

## Related

- [delegate-it](https://github.com/bfred-it/delegate-it) - DOM event delegation, in <1KB.
- [doma](https://github.com/bfred-it/doma) - Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
