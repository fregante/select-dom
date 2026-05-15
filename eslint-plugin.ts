import type {TSESLint, TSESTree} from '@typescript-eslint/utils';
import {AST_NODE_TYPES} from '@typescript-eslint/utils';

export type PreferSelectDomRuleOptions = {
	allowReadabilityExceptions?: boolean;
};

type MessageIds = 'useSelectDom';
type Options = [PreferSelectDomRuleOptions?];

const querySelectorListener = 'CallExpression[callee.type=MemberExpression]:matches([callee.property.name=querySelector], [callee.property.name=querySelectorAll])';
const closestListener = 'CallExpression[callee.type=MemberExpression][callee.property.name=closest]';

const importSource = 'select-dom';

function getParentSkippingChainExpression(node: TSESTree.Node): TSESTree.Node | undefined {
	if (node.parent?.type === AST_NODE_TYPES.ChainExpression) {
		return node.parent.parent ?? undefined;
	}

	return node.parent;
}

function getMemberExpression(node: TSESTree.CallExpression): TSESTree.MemberExpression | undefined {
	return node.callee.type === AST_NODE_TYPES.MemberExpression ? node.callee : undefined;
}

function getGlobalDocumentScope(
	sourceCode: TSESLint.SourceCode,
	node: TSESTree.Node,
	object: TSESTree.Expression,
): boolean {
	if (
		object.type !== AST_NODE_TYPES.Identifier
		|| object.name !== 'document'
	) {
		return false;
	}

	let scope = sourceCode.getScope?.(node);
	while (scope) {
		if (scope.variables.some(variable => variable.name === 'document')) {
			return false;
		}

		scope = scope.upper ?? undefined;
	}

	return true;
}

function getLastImportDeclaration(program: TSESTree.Program): TSESTree.ImportDeclaration | undefined {
	for (const statement of [...program.body].reverse()) {
		if (statement.type === AST_NODE_TYPES.ImportDeclaration) {
			return statement;
		}
	}

	return undefined;
}

function getSelectDomImport(
	program: TSESTree.Program,
): TSESTree.ImportDeclaration | undefined {
	return program.body.find(
		(statement): statement is TSESTree.ImportDeclaration =>
			statement.type === AST_NODE_TYPES.ImportDeclaration
			&& statement.importKind !== 'type'
			&& statement.source.value === importSource,
	);
}

type TextEdit = {
	range: TSESTree.Range;
	text: string;
};

function applyTextEdits(source: string, edits: TextEdit[]): string {
	return [...edits]
		.sort((a, b) => b.range[0] - a.range[0])
		.reduce(
			(text, edit) => text.slice(0, edit.range[0]) + edit.text + text.slice(edit.range[1]),
			source,
		);
}

function getImportEdit(
	sourceCode: TSESLint.SourceCode,
	method: string,
): TextEdit | undefined {
	const program = sourceCode.ast;
	const selectDomImport = getSelectDomImport(program);

	if (selectDomImport?.type === AST_NODE_TYPES.ImportDeclaration) {
		const hasMatchingLocalImport = selectDomImport.specifiers.some(
			specifier =>
				specifier.type === AST_NODE_TYPES.ImportSpecifier
				&& specifier.local.name === method,
		);

		if (
			hasMatchingLocalImport
			|| hasReusableMethodReference(sourceCode, method)
		) {
			return;
		}

		const hasNamespaceImport = selectDomImport.specifiers.some(
			specifier => specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier,
		);

		if (!hasNamespaceImport) {
			const defaultSpecifiers = selectDomImport.specifiers
				.filter(specifier => specifier.type !== AST_NODE_TYPES.ImportSpecifier)
				.map(specifier => sourceCode.getText(specifier));
			const namedSpecifiers = [
				...selectDomImport.specifiers
					.filter((specifier): specifier is TSESTree.ImportSpecifier => specifier.type === AST_NODE_TYPES.ImportSpecifier)
					.map(specifier => sourceCode.getText(specifier)),
				method,
			];

			return {
				range: selectDomImport.range,
				text: `import ${[
					...defaultSpecifiers,
					`{${namedSpecifiers.join(', ')}}`,
				].join(', ')} from '${importSource}';`,
			};
		}
	}

	const importText = `import {${method}} from '${importSource}';`;
	const lastImportDeclaration = getLastImportDeclaration(program);

	if (lastImportDeclaration) {
		return {
			range: [lastImportDeclaration.range[1], lastImportDeclaration.range[1]],
			text: `\n${importText}`,
		};
	}

	const firstStatement = program.body[0];
	const insertionIndex = firstStatement?.range[0] ?? 0;

	return {
		range: [insertionIndex, insertionIndex],
		text: `${importText}\n`,
	};
}

function hasReusableMethodReference(
	sourceCode: TSESLint.SourceCode,
	method: string,
): boolean {
	return getMethodReference(sourceCode, method) !== method;
}

function getMethodReference(
	sourceCode: TSESLint.SourceCode,
	method: string,
): string {
	const selectDomImport = getSelectDomImport(sourceCode.ast);
	if (!selectDomImport) {
		return method;
	}

	for (const specifier of selectDomImport.specifiers) {
		if (
			specifier.type === AST_NODE_TYPES.ImportSpecifier
			&& specifier.imported.type === AST_NODE_TYPES.Identifier
			&& specifier.imported.name === method
		) {
			return specifier.local.name;
		}

		if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
			return `${specifier.local.name}.${method}`;
		}
	}

	return method;
}

function getFixedOutput(
	sourceCode: TSESLint.SourceCode,
	node: TSESTree.Node,
	replacementText: string,
	method: string,
): string | undefined {
	if (sourceCode.ast.sourceType !== 'module') {
		return;
	}

	const edits: TextEdit[] = [
		{
			range: node.range,
			text: replacementText,
		},
	];
	const importEdit = getImportEdit(sourceCode, method);
	if (importEdit) {
		edits.push(importEdit);
	}

	return applyTextEdits(sourceCode.text, edits);
}

const preferSelectDom = {
	meta: {
		type: 'suggestion',
		fixable: 'code',
		messages: {
			useSelectDom: 'Use select-dom\'s {{replacement}}() instead of .{{method}}()',
		},
		schema: [
			{
				type: 'object',
				additionalProperties: false,
				properties: {
					allowReadabilityExceptions: {
						type: 'boolean',
					},
				},
			},
		],
	},
	create(context: Readonly<TSESLint.RuleContext<MessageIds, Options>>) {
		const {sourceCode} = context;
		const [{allowReadabilityExceptions = false} = {}] = context.options;
		const listeners: TSESLint.RuleListener = {};

		listeners[closestListener] = (node: TSESTree.Node) => {
			if (node.type !== AST_NODE_TYPES.CallExpression) {
				return;
			}

			const memberExpression = getMemberExpression(node);
			if (!memberExpression) {
				return;
			}

			const selector = node.arguments[0];
			if (!selector) {
				return;
			}

			const parent = getParentSkippingChainExpression(node);
			const isNonNull = parent?.type === AST_NODE_TYPES.TSNonNullExpression;
			const replacement = isNonNull ? '$closest' : '$closestOptional';
			const methodReference = getMethodReference(sourceCode, replacement);
			const nodeToReplace = isNonNull ? parent : node;

			context.report({
				node,
				messageId: 'useSelectDom',
				data: {replacement, method: 'closest'},
				fix(fixer) {
					const objectText = sourceCode.getText(memberExpression.object);
					const output = getFixedOutput(
						sourceCode,
						nodeToReplace,
						`${methodReference}(${sourceCode.getText(selector)}, ${objectText})`,
						replacement,
					);

					return output
						? fixer.replaceTextRange([0, sourceCode.text.length], output)
						: null;
				},
			});
		};

		listeners[querySelectorListener] = (node: TSESTree.Node) => {
			if (node.type !== AST_NODE_TYPES.CallExpression) {
				return;
			}

			const memberExpression = getMemberExpression(node);
			if (!memberExpression) {
				return;
			}

			const {object} = memberExpression;
			if (
				allowReadabilityExceptions
				&& object.type !== AST_NODE_TYPES.Identifier
				&& object.type !== AST_NODE_TYPES.ThisExpression
			) {
				return;
			}

			const {property} = memberExpression;
			if (
				memberExpression.computed
				|| property.type !== AST_NODE_TYPES.Identifier
			) {
				return;
			}

			const {name: method} = property;
			const replacement = method === 'querySelectorAll' ? '$$' : '$';
			const methodReference = getMethodReference(sourceCode, replacement);
			const callArguments = node.arguments.map(argument => sourceCode.getText(argument));
			if (!getGlobalDocumentScope(sourceCode, node, object)) {
				callArguments.push(sourceCode.getText(object));
			}

			context.report({
				node,
				messageId: 'useSelectDom',
				data: {replacement, method},
				fix(fixer) {
					const output = getFixedOutput(
						sourceCode,
						node,
						`${methodReference}(${callArguments.join(', ')})`,
						replacement,
					);

					return output
						? fixer.replaceTextRange([0, sourceCode.text.length], output)
						: null;
				},
			});
		};

		return listeners;
	},
};

const plugin = {
	rules: {
		prefer: preferSelectDom,
	},
};

export default plugin;
