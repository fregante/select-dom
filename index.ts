import type {ParseSelector} from 'typed-query-selector/parser.js';

// WARNING: Overloads have to repeated in that fashion because the actual function’s signature is discarded; Only the 2 overloads are brought into the .d.ts file. Tests pass because `tsd` reads from this file instead of `.d.ts`

// ParentNode is inherited by Element, Document, DocumentFragment
type BaseElements = ParentNode | Iterable<ParentNode>;

// Type predicate for TypeScript
function isQueryable(object: BaseElements): object is ParentNode {
	return typeof (object as any).querySelectorAll === 'function';
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function $<Selector extends string, Selected extends Element = ParseSelector<Selector, HTMLElement>>(
	selectors: Selector | readonly Selector[],
	baseElement?: ParentNode
): Selected | undefined;
function $<Selected extends Element = HTMLElement>(
	selectors: string | readonly string[],
	baseElement?: ParentNode
): Selected | undefined;
function $<Selected extends Element>(
	selectors: string | readonly string[],
	baseElement?: ParentNode,
): Selected | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return;
	}

	return (baseElement ?? document).querySelector<Selected>(String(selectors)) ?? undefined;
}

export class ElementNotFoundError extends Error {
	override name = 'ElementNotFoundError';
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, or an error
 */
function expectElement<Selector extends string, Selected extends Element = ParseSelector<Selector, HTMLElement>>(
	selectors: Selector | readonly Selector[],
	baseElement?: ParentNode
): Selected;
function expectElement<Selected extends Element = HTMLElement>(
	selectors: string | readonly string[],
	baseElement?: ParentNode
): Selected;
function expectElement<Selected extends Element>(
	selectors: string | readonly string[],
	baseElement?: ParentNode,
): Selected {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		throw new ElementNotFoundError('Expected element not found because the base is specified but null');
	}

	const element = (baseElement ?? document).querySelector<Selected>(String(selectors));
	if (element) {
		return element;
	}

	throw new ElementNotFoundError(`Expected element not found: ${String(selectors)}`);
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function lastElement<Selector extends string, Selected extends Element = ParseSelector<Selector, HTMLElement>>(
	selectors: Selector | readonly Selector[],
	baseElement?: ParentNode
): Selected | undefined;
function lastElement<Selected extends Element = HTMLElement>(
	selectors: string | readonly string[],
	baseElement?: ParentNode
): Selected | undefined;
function lastElement<Selected extends Element>(
	selectors: string | readonly string[],
	baseElement?: ParentNode,
): Selected | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return undefined;
	}

	const all = (baseElement ?? document).querySelectorAll<Selected>(String(selectors));
	// eslint-disable-next-line unicorn/prefer-at -- Not an Array, not worth converting it
	return all[all.length - 1];
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               Whether it's been found
 */
function elementExists(
	selectors: string | readonly string[],
	baseElement?: ParentNode,
): boolean {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return false;
	}

	return Boolean((baseElement ?? document).querySelector(String(selectors)));
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The number of elements found
 */
function countElements(
	selectors: string | readonly string[],
	baseElement?: ParentNode,
): number {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return 0;
	}

	return (baseElement ?? document).querySelectorAll(String(selectors)).length;
}

/**
 * @param selectors       One or more CSS selectors separated by commas
 * @param [baseElements]  The element or list of elements to look inside of
 * @return                An array of elements found
 */
function $$<Selector extends string, Selected extends Element = ParseSelector<Selector, HTMLElement>>(
	selectors: Selector | readonly Selector[],
	baseElements?: BaseElements
): Selected[];
function $$<Selected extends Element = HTMLElement>(
	selectors: string | readonly string[],
	baseElements?: BaseElements
): Selected[];
function $$<Selected extends Element>(
	selectors: string | readonly string[],
	baseElements?: BaseElements,
): Selected[] {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		return [];
	}

	// Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
	if (!baseElements || isQueryable(baseElements)) {
		const elements = (baseElements ?? document).querySelectorAll<Selected>(String(selectors));
		return Array.prototype.slice.call(elements) as Selected[];
	}

	const elements = new Set<Selected>();
	for (const baseElement of baseElements) {
		for (const element of baseElement.querySelectorAll<Selected>(String(selectors))) {
			elements.add(element);
		}
	}

	return [...elements]; // Convert to array
}

/**
 * @param selectors       One or more CSS selectors separated by commas
 * @param [baseElements]  The element or list of elements to look inside of
 * @return                An array of elements found
 */
function expectElements<Selector extends string, Selected extends Element = ParseSelector<Selector, HTMLElement>>(
	selectors: Selector | readonly Selector[],
	baseElements?: BaseElements
): Selected[];
function expectElements<Selected extends Element = HTMLElement>(
	selectors: string | readonly string[],
	baseElements?: BaseElements
): Selected[];
function expectElements<Selected extends Element>(
	selectors: string | readonly string[],
	baseElements?: BaseElements,
): Selected[] {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		throw new ElementNotFoundError('Expected elements not found because the base is specified but null');
	}

	const elements = $$<Selected>(selectors, baseElements);
	if (elements.length > 0) {
		return elements;
	}

	throw new ElementNotFoundError(`Expected elements not found: ${String(selectors)}`);
}

export {$, $$, lastElement, elementExists, expectElement, expectElements, countElements};
