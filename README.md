# select-dom

DOM Selector Library for IE9+

## Install

```bash
$ npm install select-dom --save
```

## Examples

```js
var select = require('select-dom')

select('.foo a[href=bar]')
// => <Element>

select('.foo a[href=bar]', parentElement)
// => <Element>

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

### `select.all(selector[, parents = document])`

Maps to `parents.querySelectorAll(selector)` plus:

* it always returns an array
* parents can be *undefined*, an element, an array of elements, or NodeList

Essentially now you can do something like:

```js
select.all('.foo a[href=bar]', select.all('.parents'));
```