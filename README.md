## dom-select

DOM Selector Library for IE9+

```js
var select = require('select-dom')

select('.foo a[href=bar]')
// => [Element]

select.all('.foo a[href=bar]')
// => [[Element], [Element], [Element]]

select.all('.foo a[href=bar]', parentElement)
// => [[Element], [Element], [Element]]
```

## Install

```bash
$ npm install dom-select
```
