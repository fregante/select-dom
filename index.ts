// Types inspired by
// https://github.com/Microsoft/TypeScript/blob/9d3707d/src/lib/dom.generated.d.ts#L10581

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
function select<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): HTMLElementTagNameMap[T] | undefined;
function select<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): SVGElementTagNameMap[T] | undefined;
function select<T extends HTMLElement = HTMLElement>(
	selectors: string | string[],
	baseElement?: ParentNode
): T | undefined;
function select(selectors: string | string[], baseElement?: ParentNode): HTMLElement | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return;
	}

	return (baseElement ?? document).querySelector<T>(String(selectors)) ?? undefined;
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function selectLast<T extends keyof HTMLElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): HTMLElementTagNameMap[T] | undefined;
function selectLast<T extends keyof SVGElementTagNameMap>(
	selectors: T,
	baseElement?: ParentNode
): SVGElementTagNameMap[T] | undefined;
function selectLast<T extends HTMLElement = HTMLElement>(
	selectors: string | string[],
	baseElement?: ParentNode
): T | undefined;
function selectLast(selectors: string | string[], baseElement?: ParentNode): HTMLElement | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return undefined;
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
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return false;
	}

	return Boolean((baseElement ?? document).querySelector(String(selectors)));
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

	const queried = new Set<Element>();
	for (const baseElement of baseElements) {
		for (const element of baseElement.querySelectorAll(String(selectors))) {
			queried.add(element);
		}
	}

	return [...queried]; // Convert to array
}

select.last = selectLast;
select.exists = selectExists;
select.all = selectAll;

export default select;
