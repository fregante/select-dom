// Types inspired by
// https://github.com/Microsoft/TypeScript/blob/9d3707d/src/lib/dom.generated.d.ts#L10581

// ParentNode is inherited by Element, Document, DocumentFragment
type BaseElements = ParentNode | ArrayLike<ParentNode>;

// Type predicate for TypeScript
function isQueryable(object: BaseElements): object is ParentNode {
	return typeof (object as any).querySelectorAll === 'function';
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */

function select<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): HTMLElementTagNameMap[T] | null;
function select<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): SVGElementTagNameMap[T] | null;
function select<T extends HTMLElement = HTMLElement>(
	selectors: string | string[],
	baseElement?: ParentNode
): T | null;
function select(selectors: string | string[], baseElement?: ParentNode): HTMLElement | null {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return null;
	}

	return (baseElement ?? document).querySelector(String(selectors));
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */

function selectLast<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): HTMLElementTagNameMap[T] | null;
function selectLast<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): SVGElementTagNameMap[T] | null;
function selectLast<T extends HTMLElement = HTMLElement>(
	selectors: string | string[],
	baseElement?: ParentNode
): T | null;
function selectLast(selectors: string | string[], baseElement?: ParentNode): HTMLElement | null {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return null;
	}

	const all = (baseElement ?? document).querySelectorAll<HTMLElement>(String(selectors));
	return all[all.length - 1];
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               Whether it's been found
 */
function selectExists(
	selectors: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | string | string[],
	baseElement?: ParentNode
): boolean {
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

function selectAll<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElements?: BaseElements
): Array<HTMLElementTagNameMap[T]>;
function selectAll<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElements?: BaseElements
): Array<SVGElementTagNameMap[T]>;
function selectAll<T extends HTMLElement = HTMLElement> (
	selectors: string | string[],
	baseElements?: BaseElements
): T[];
function selectAll(selectors: string | string[], baseElements?: BaseElements): Element[] {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		return [];
	}

	// Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
	if (!baseElements || isQueryable(baseElements)) {
		const elements = (baseElements ?? document).querySelectorAll(String(selectors));
		return Array.apply(null, elements as any) as Element[];
	}

	const all = [];
	for (let i = 0; i < baseElements.length; i++) {
		const current = baseElements[i].querySelectorAll(String(selectors));
		for (let ii = 0; ii < current.length; ii++) {
			all.push(current[ii]);
		}
	}

	// Preserves IE11 support and performs 3x better than `...all` in Safari
	const arr: Element[] = [];
	all.forEach(function (v) {
		arr.push(v);
	});

	return arr;
}

select.last = selectLast;
select.exists = selectExists;
select.all = selectAll;

export default select;
