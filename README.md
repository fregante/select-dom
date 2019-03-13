# select-dom [![gzipped size][badge-gzip]](#no-link) [![Travis build status][badge-travis]][link-travis] [![npm version][badge-version]][link-npm] [![npm downloads][badge-downloads]][link-npm]

  [badge-gzip]: https://badges.herokuapp.com/size/github/bfred-it/select-dom/master/index.js?gzip=true&label=gzipped%20size
  [badge-travis]: https://api.travis-ci.org/bfred-it/select-dom.svg
  [badge-version]: https://img.shields.io/npm/v/select-dom.svg
  [badge-downloads]: https://img.shields.io/npm/dt/select-dom.svg
  [link-travis]: https://travis-ci.org/bfred-it/select-dom
  [link-npm]: https://www.npmjs.com/package/select-dom

> Lightweight `querySelector`/`All` wrapper that outputs an Array

## Install

```bash
$ npm install select-dom@4
```

## Examples

```js
var select = require('select-dom')
```

### `select()`

```js
select('.foo a[href=bar]')
// => <Element>

select('.foo a[href=bar]', baseElement)
// => <Element>
```

### `select.exists()`

```js
select.exists('.foo a[href=bar]')
// => true/false

select.exists('.foo a[href=bar]', baseElement)
// => true/false
```

### `select.all()`

```js
select.all('.foo a[href=bar]')
// => [<Element>, <Element>, <Element>]

select.all('.foo a[href=bar]', baseElement)
// => [<Element>, <Element>, <Element>]

select.all('.foo a[href=bar]', [baseElement1, baseElement2])
// => [<Element>, <Element>, <Element>]
```

## API

**Note:** if a falsy value is passed as `baseElement`, you'll always get an empty result ([bd578b9](https://github.com/bfred-it/select-dom/commit/bd578b975e35d9f802cb43a900a6d3c83095c76a))

### `select(selector[, baseElement = document])`

Maps to `baseElement.querySelector(selector)`

### `select.exists(selector[, baseElement = document])`

Tests the existence of one or more elements matching the selector.

### `select.all(selector[, baseElements = document])`

Maps to `baseElements.querySelectorAll(selector)` plus:

* it always returns an array
* baseElements can be an element, an array of elements, or NodeList

This lets you search through an existing list of elements, like:

```js
const baseElements = select.all('.baseElements').filter(Math.random);
select.all('.foo a[href=bar]', baseElements);
```
