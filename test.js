import test from 'tape';
import {$, $$, $optional, $closest, $closestOptional, lastElement, elementExists, assertElementExists, ElementNotFoundError} from './index.js';

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

test('expects at least one element', t => {
	t.plan(2);

	const li = document.querySelector('ul li');
	t.equal($('ul li'), li);

	t.throws(() => $('lololol'));
});

test('expects one element within an ancestor', t => {
	t.plan(2);

	const li = document.querySelector('ul li');
	t.equal($('li', $('ul')), li);

	t.throws(() => $('ul', $('li')), error => error instanceof ElementNotFoundError);
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

test('expects a last element', t => {
	t.plan(2);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal(lastElement('ul li'), li);

	t.throws(() => lastElement('lololol'));
});

test('expects a last element within an ancestor', t => {
	t.plan(2);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal(lastElement('li', lastElement('ul')), li);

	t.throws(() => lastElement('ul', lastElement('li')), error => error instanceof ElementNotFoundError);
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
	t.false(elementExists('ul', $optional('lololol')));
});

test('asserts existence of one element', t => {
	t.plan(2);

	t.doesNotThrow(() => assertElementExists('ul li'));
	t.throws(() => assertElementExists('lololol'), error => error instanceof ElementNotFoundError);
});

test('asserts existence of one element within an ancestor', t => {
	t.plan(3);

	t.doesNotThrow(() => assertElementExists('li', $('ul')));
	t.throws(() => assertElementExists('ul', $('li')), error => error instanceof ElementNotFoundError);
	t.throws(() => assertElementExists('ul', $optional('lololol')), error => error instanceof ElementNotFoundError);
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

test('counts elements', t => {
	t.plan(1);

	t.equal($$('ul li').length, 5);
});

test('$closest finds closest ancestor', t => {
	t.plan(1);

	const li = $('ul li');
	t.equal($closest('ul', li), $('ul'));
});

test('$closest finds self', t => {
	t.plan(1);

	const ul = $('ul');
	t.equal($closest('ul', ul), ul);
});

test('$closest works with text node', t => {
	t.plan(1);

	const li = $('ul li');
	t.equal($closest('ul', li.firstChild), $('ul'));
});

test('$closest throws if not found', t => {
	t.plan(1);

	t.throws(() => $closest('section', $('ul li')), error => error instanceof ElementNotFoundError);
});

test('$closest throws with null base', t => {
	t.plan(1);

	t.throws(() => $closest('ul', $optional('lololol')), error => error instanceof ElementNotFoundError);
});

test('$closestOptional finds closest ancestor', t => {
	t.plan(1);

	const li = $('ul li');
	t.equal($closestOptional('ul', li), $('ul'));
});

test('$closestOptional works with text node', t => {
	t.plan(1);

	const li = $('ul li');
	t.equal($closestOptional('ul', li.firstChild), $('ul'));
});

test('$closestOptional returns undefined if not found', t => {
	t.plan(1);

	t.equal($closestOptional('section', $('ul li')), undefined);
});

test('$closestOptional returns undefined with null base', t => {
	t.plan(1);

	t.equal($closestOptional('ul', $optional('lololol')), undefined);
});
