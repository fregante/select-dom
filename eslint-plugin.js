/** @typedef {import('eslint').Rule.RuleModule} RuleModule */

/** @type {RuleModule} */
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
	create(context) {
		const {sourceCode} = context;
		const [{allowReadabilityExceptions = false} = {}] = context.options;

		return {
			// X.closest(sel) → $closest(sel, x) or $closestOptional(sel, x)
			'CallExpression[callee.type=MemberExpression][callee.property.name=closest]'(node) {
				const {object} = node.callee;

				// Determine parent, skipping over ChainExpression wrappers
				const parent = node.parent?.type === 'ChainExpression' ? node.parent.parent : node.parent;

				const isNonNull = parent?.type === 'TSNonNullExpression';
				const replacement = isNonNull ? '$closest' : '$closestOptional';

				// The node to replace: for non-null, replace the whole `x.closest(sel)!`; otherwise just the call
				const nodeToReplace = isNonNull ? parent : node;

				context.report({
					node,
					messageId: 'useSelectDom',
					data: {replacement, method: 'closest'},
					fix(fixer) {
						const selector = sourceCode.getText(node.arguments[0]);
						const objectText = sourceCode.getText(object);
						return fixer.replaceText(nodeToReplace, `${replacement}(${selector}, ${objectText})`);
					},
				});
			},

			'CallExpression[callee.type=MemberExpression]:matches([callee.property.name=querySelector], [callee.property.name=querySelectorAll])'(
				node,
			) {
				const {object} = node.callee;
				if (
					allowReadabilityExceptions
					&& object.type !== 'Identifier'
					&& object.type !== 'ThisExpression'
				) {
					return;
				}

				const methodName = node.callee.property.name;
				const isQueryAll = methodName === 'querySelectorAll';
				const replacement = isQueryAll ? '$$' : '$';

				// Treat `document` as global only if it's not shadowed by a local variable
				const isGlobalDocument = (() => {
					if (object.type !== 'Identifier' || object.name !== 'document') {
						return false;
					}

					// Walk up the scope chain to check for a local `document` binding
					let scope = sourceCode.getScope(node);
					while (scope) {
						if (scope.variables.some(variable => variable.name === 'document')) {
							return false;
						}

						scope = scope.upper;
					}

					return true;
				})();

				context.report({
					node,
					messageId: 'useSelectDom',
					data: {replacement, method: methodName},
					fix(fixer) {
						const callArguments = node.arguments.map(argument => sourceCode.getText(argument));
						if (!isGlobalDocument) {
							callArguments.push(sourceCode.getText(object));
						}

						return fixer.replaceText(node, `${replacement}(${callArguments.join(', ')})`);
					},
				});
			},
		};
	},
};

const plugin = {
	rules: {
		'prefer-select-dom': preferSelectDom,
	},
};

export default plugin;
