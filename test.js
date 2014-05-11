var test = require('prova');
var select = require("./");
var qs = document.querySelector;
var qsAll = document.querySelectorAll;

document.body.innerHTML = '<ul><li>Foo</li><li>Bar</li><li>Qux</li></ul>';

test('selects one element', function (t) {
  var li = document.querySelector('ul li');
  t.equal(select('ul li'), li);

  document.querySelector = undefined;

  t.equal(select('ul li'), li);

  document.querySelector = qs;
  t.end();
});

test('selects all elements', function (t) {
  var li = document.querySelectorAll('ul li');
  t.deepEqual(select.all('ul li'), li);

  document.querySelectorAll = undefined;

  t.deepEqual(select.all('ul li'), Array.prototype.slice.call(li));

  document.querySelectorAll = qsAll;

  t.end();
});
