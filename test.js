import test from 'tape';
import select from '.';

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
	t.equal(select('ul li'), li);
});

test('selects one element within an ancestor', t => {
	t.plan(1);

	const li = document.querySelector('ul li');
	t.equal(select('li', select('ul')), li);
});

test('selects the last element', t => {
	t.plan(1);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal(select.last('ul li'), li);
});

test('selects the last element within an ancestor', t => {
	t.plan(1);

	const li = [...document.querySelectorAll('ul li')].pop();
	t.equal(select.last('li', select.last('ul')), li);
});

test('tests existence of one element', t => {
	t.plan(2);

	t.true(select.exists('ul li'));
	t.false(select.exists('lololol'));
});

test('tests existence of one element within an ancestor', t => {
	t.plan(3);

	t.true(select.exists('li', select('ul')));
	t.false(select.exists('ul', select('li')));
	t.false(select.exists('ul', select('lololol')));
});

test('selects all elements', t => {
	t.plan(1);

	const li = document.querySelectorAll('ul li');
	t.deepEqual(select.all('ul li'), li);
});

test('selects all elements within an ancestor', t => {
	t.plan(1);

	const li = document.querySelector('ul').querySelectorAll('ul li');
	t.deepEqual(select.all('li', select('ul')), li);
});

test('selects all elements within an array of ancestors', t => {
	t.plan(1);

	const li = document.querySelectorAll('ul li');
	t.deepEqual(select.all('li', select.all('ul')), li);
});
