var test = require('tape');
var select = require("./");

document.body.innerHTML = '<ul><li>Foo</li><li>Bar</li><li>Qux</li></ul><ul><li>Lorem</li><li>Ipsum</li></ul>';

test('selects one element', function (t) {
  t.plan(1);

  var li = document.querySelector('ul li');
  t.equal(select('ul li'), li);
});

test('selects one element within an ancestor', function (t) {
  t.plan(1);

  var li = document.querySelector('ul li');
  t.equal(select('li', select('ul')), li);
});

test('selects all elements', function (t) {
  t.plan(1);

  var li = document.querySelectorAll('ul li');
  t.deepEqual(select.all('ul li'), li);
});

test('selects all elements within an ancestor', function (t) {
  t.plan(1);

  var li = document.querySelector('ul').querySelectorAll('ul li');
  t.deepEqual(select.all('li', select('ul')), li);
});

test('selects all elements within an array of ancestors', function (t) {
  t.plan(1);

  var li = document.querySelectorAll('ul li');
  t.deepEqual(select.all('li', select.all('ul')), li);
});
