import test from 'tape';
import {$, $$, $last, $exists} from './index.js';

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
	t.equal($last('ul li'), li);
});

test('selects the last element within an ancestor', t => {
	t.plan(1);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal($last('li', $last('ul')), li);
});

test('tests existence of one element', t => {
	t.plan(2);

	t.true($exists('ul li'));
	t.false($exists('lololol'));
});

test('tests existence of one element within an ancestor', t => {
	t.plan(3);

	t.true($exists('li', $('ul')));
	t.false($exists('ul', $('li')));
	t.false($exists('ul', $('lololol')));
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
