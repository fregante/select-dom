import assert from 'node:assert/strict';
import test from 'node:test';
import selectDom from './eslint-plugin.js';

const querySelectorRule = 'CallExpression[callee.type=MemberExpression]:matches([callee.property.name=querySelector], [callee.property.name=querySelectorAll])';
const closestRule = 'CallExpression[callee.type=MemberExpression][callee.property.name=closest]';

function runRule(listenerName, node, {options, scope} = {}) {
	const reports = [];
	const listeners = selectDom.rules.prefer.create({
		options: options ? [options] : undefined,
		sourceCode: {
			getText(currentNode) {
				return currentNode.text;
			},
			getScope() {
				return scope;
			},
		},
		report(descriptor) {
			reports.push(descriptor);
		},
	});

	listeners[listenerName](node);
	return reports;
}

function applyFix(report) {
	return report.fix({
		replaceText: (_node, text) => text,
	});
}

test('exports the prefer rule and config', () => {
	assert.equal(selectDom.configs.prefer.rules['select-dom/prefer'], 'error');
	assert.ok(selectDom.rules.prefer);
});

test('reports querySelector calls by default', () => {
	const reports = runRule(querySelectorRule, {
		callee: {
			object: {
				type: 'MemberExpression',
				text: 'element.firstChild',
			},
			property: {
				name: 'querySelector',
			},
		},
		arguments: [
			{text: '\'.item\''},
		],
	});

	assert.equal(reports.length, 1);
	assert.equal(applyFix(reports[0]), '$(\'.item\', element.firstChild)');
});

test('skips readability exceptions when enabled', () => {
	const reports = runRule(querySelectorRule, {
		callee: {
			object: {
				type: 'MemberExpression',
				text: 'element.firstChild',
			},
			property: {
				name: 'querySelector',
			},
		},
		arguments: [
			{text: '\'.item\''},
		],
	}, {
		options: {
			allowReadabilityExceptions: true,
		},
	});

	assert.equal(reports.length, 0);
});

test('omits the global document receiver from querySelector fixes', () => {
	const reports = runRule(querySelectorRule, {
		callee: {
			object: {
				type: 'Identifier',
				name: 'document',
				text: 'document',
			},
			property: {
				name: 'querySelector',
			},
		},
		arguments: [
			{text: '\'.item\''},
		],
	});

	assert.equal(reports.length, 1);
	assert.equal(applyFix(reports[0]), '$(\'.item\')');
});

test('keeps a shadowed document receiver in querySelector fixes', () => {
	const reports = runRule(querySelectorRule, {
		callee: {
			object: {
				type: 'Identifier',
				name: 'document',
				text: 'document',
			},
			property: {
				name: 'querySelector',
			},
		},
		arguments: [
			{text: '\'.item\''},
		],
	}, {
		scope: {
			variables: [
				{name: 'document'},
			],
		},
	});

	assert.equal(reports.length, 1);
	assert.equal(applyFix(reports[0]), '$(\'.item\', document)');
});

test('fixes closest calls with and without non-null assertions', () => {
	const optionalReports = runRule(closestRule, {
		callee: {
			object: {
				type: 'Identifier',
				name: 'button',
				text: 'button',
			},
			property: {
				name: 'closest',
			},
		},
		arguments: [
			{text: '\'form\''},
		],
	});

	assert.equal(optionalReports.length, 1);
	assert.equal(applyFix(optionalReports[0]), '$closestOptional(\'form\', button)');

	const nonNullParent = {
		type: 'TSNonNullExpression',
	};
	const requiredReports = runRule(closestRule, {
		callee: {
			object: {
				type: 'Identifier',
				name: 'button',
				text: 'button',
			},
			property: {
				name: 'closest',
			},
		},
		arguments: [
			{text: '\'form\''},
		],
		parent: nonNullParent,
	});

	assert.equal(requiredReports.length, 1);
	assert.equal(applyFix(requiredReports[0]), '$closest(\'form\', button)');
});
