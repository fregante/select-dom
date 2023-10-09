import test from 'tape';
import {$, $$, lastElement, elementExists} from './index.js';

document.body.innerHTML = `
	<ul>
		<li>Foo</li>
		<li>Bar</li>
		<li>Qux</li>
	</ul>
	<ul>
		<li>Lorem</li>
		<li>Ipsum</li>
	</ul>
`;

test('selects one element', t => {
	t.plan(1);

	const li = document.querySelector('ul li');
	t.equal($('ul li'), li);
});

test('selects one element within an ancestor', t => {
	t.plan(1);

	const li = document.querySelector('ul li');
	t.equal($('li', $('ul')), li);
});

test('selects the last element', t => {
	t.plan(1);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal(lastElement('ul li'), li);
});

test('selects the last element within an ancestor', t => {
	t.plan(1);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal(lastElement('li', lastElement('ul')), li);
});

test('tests existence of one element', t => {
	t.plan(2);

	t.true(elementExists('ul li'));
	t.false(elementExists('lololol'));
});

test('tests existence of one element within an ancestor', t => {
	t.plan(3);

	t.true(elementExists('li', $('ul')));
	t.false(elementExists('ul', $('li')));
	t.false(elementExists('ul', $('lololol')));
});

test('selects all elements', t => {
	t.plan(1);

	const li = document.querySelectorAll('ul li');
	t.deepEqual($$('ul li'), [...li]);
});

test('selects all elements within an ancestor', t => {
	t.plan(1);

	const li = document.querySelector('ul').querySelectorAll('ul li');
	t.deepEqual($$('li', $('ul')), [...li]);
});

test('selects all elements within an array of ancestors', t => {
	t.plan(1);

	const li = document.querySelectorAll('ul li');
	t.deepEqual($$('li', $$('ul')), [...li]);
});

test('selects all elements within an array of ancestors without duplicates', t => {
	t.plan(1);

	const li = document.querySelector('ul').querySelectorAll('li');
	t.deepEqual($$('li', [$('ul'), $('ul')]), [...li]);
});
