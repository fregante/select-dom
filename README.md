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
$ npm install select-dom
```

## Examples

```js
var select = require('select-dom')

/**
 * select()
 */
select('.foo a[href=bar]')
// => <Element>

select('.foo a[href=bar]', parentElement)
// => <Element>

/**
 * select.exists()
 */

select.exists('.foo a[href=bar]')
// => true/false

select.exists('.foo a[href=bar]', parentElement)
// => true/false


/**
 * select.all()
 */
select.all('.foo a[href=bar]')
// => [<Element>, <Element>, <Element>]

select.all('.foo a[href=bar]', parentElement)
// => [<Element>, <Element>, <Element>]

select.all('.foo a[href=bar]', [parentElement1, parentElement2])
// => [<Element>, <Element>, <Element>]
```

## API

### `select(selector[, parent = document])`

Maps to `parent.querySelector(selector)`

### `select.exists(selector[, parent = document])`

Tests the existence of one or more elements matching the selector.

### `select.all(selector[, parents = document])`

Maps to `parents.querySelectorAll(selector)` plus:

* it always returns an array
* parents can be *undefined*, an element, an array of elements, or NodeList

Essentially now you can do something like:

```js
const parents = select.all('.parents');
if(checkSomething(parents)) {
    select.all('.foo a[href=bar]', parents);
}
```
