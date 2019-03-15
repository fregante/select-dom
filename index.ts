// Types inspired by
// https://github.com/Microsoft/TypeScript/blob/9d3707d/src/lib/dom.generated.d.ts#L10581

type BaseElement = Element | DocumentFragment | Document | Window;
type BaseElements = Element | Element[] | NodeList | DocumentFragment | Document | Window;

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */

function select<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElement?: BaseElement
): HTMLElementTagNameMap[T] | null;
function select<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElement?: BaseElement
): SVGElementTagNameMap[T] | null;
function select<T extends HTMLElement = HTMLElement>(
	selectors: string,
	baseElement?: BaseElement
): T | null;
function select(selectors: any, baseElement: any): any {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return null;
	}

	return (baseElement || document).querySelector(selectors);
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               Whether it's been found
 */
function exists <T extends HTMLElement = HTMLElement> (
	selectors: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | string,
	baseElement?: BaseElement
): boolean;
function exists(selectors: any, baseElement: any): boolean {
	if (arguments.length === 2) {
		return Boolean(select(selectors, baseElement));
	}

	return Boolean(select(selectors));
}

/**
 * @param selectors       One or more CSS selectors separated by commas
 * @param [baseElements]  The element or list of elements to look inside of
 * @return                An array of elements found
 */

function all<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElements?: BaseElements
): HTMLElementTagNameMap[T][];
function all<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElements?: BaseElements
): SVGElementTagNameMap[T][];
function all<T extends HTMLElement = HTMLElement> (
	selectors: string,
	baseElements?: BaseElements
): T[];
function all<T>(selectors: any, baseElements: any): T[] {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		return [];
	}

	// Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
	if (!baseElements || typeof baseElements.querySelectorAll === 'function') {
		return new Array(...(baseElements || document).querySelectorAll(selectors));
	}

	const all = [];
	for (let i = 0; i < baseElements.length; i++) {
		const current = baseElements[i].querySelectorAll(selectors);
		for (let ii = 0; ii < current.length; ii++) {
			all.push(current[ii]);
		}
	}

	// Preserves IE11 support and performs 3x better then ...all in Safari
	const arr: T[] = [];
	all.forEach(function (v) {
		arr.push(v);
	});
	return arr;
}

select.exists = exists;
select.all = all;

module.exports = select;
export default select;
