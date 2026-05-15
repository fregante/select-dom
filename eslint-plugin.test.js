import {createRequire} from 'node:module';
import {describe, it} from 'node:test';
import {RuleTester} from 'eslint';
import selectDom from './eslint-plugin.js';

const require = createRequire(import.meta.url);

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({
	parser: require.resolve('@typescript-eslint/parser'),
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
});

ruleTester.run('select-dom/prefer', selectDom.rules.prefer, {
	valid: [
		{
			code: 'import {$} from \'select-dom\';\n$(\'.item\');',
		},
		{
			code: 'element.firstChild.querySelector(\'.item\');',
			options: [{allowReadabilityExceptions: true}],
		},
	],
	invalid: [
		{
			code: 'document.querySelector(\'.item\');',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import {$} from \'select-dom\';\n$(\'.item\');',
		},
		{
			code: 'import {$optional} from \'select-dom\';\ndocument.querySelector(\'.item\');',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import {$optional, $} from \'select-dom\';\n$(\'.item\');',
		},
		{
			code: 'import selectDom from \'select-dom\';\ndocument.querySelector(\'.item\');',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import selectDom, {$} from \'select-dom\';\n$(\'.item\');',
		},
		{
			code: 'import * as selectDom from \'select-dom\';\ndocument.querySelector(\'.item\');',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import * as selectDom from \'select-dom\';\nimport {$} from \'select-dom\';\n$(\'.item\');',
		},
		{
			code: 'const document = root;\ndocument.querySelector(\'.item\');',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import {$} from \'select-dom\';\nconst document = root;\n$(\'.item\', document);',
		},
		{
			code: 'button.closest(\'form\')!;',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import {$closest} from \'select-dom\';\n$closest(\'form\', button);',
		},
		{
			code: 'import {$closestOptional} from \'select-dom\';\nbutton.closest(\'form\');',
			errors: [{messageId: 'useSelectDom'}],
			output: 'import {$closestOptional} from \'select-dom\';\n$closestOptional(\'form\', button);',
		},
	],
});
