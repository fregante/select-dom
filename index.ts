import type {ParseSelector} from 'typed-query-selector/parser';

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
function select<TElement extends Element = HTMLElement>(
	selectors: string | string[],
	baseElement?: ParentNode
): TElement | undefined;
function select<
	Selector extends string,
	TElement extends Element = ParseSelector<Selector>
>(
	selectors: Selector | Selector[],
	baseElement?: ParentNode
): TElement | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return;
	}

	return (baseElement ?? document).querySelector<TElement>(String(selectors)) ?? undefined;
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function selectLast<TElement extends Element = HTMLElement>(
	selectors: string | string[],
	baseElement?: ParentNode
): TElement | undefined;
function selectLast<
	Selector extends string,
	TElement extends Element = ParseSelector<Selector>
>(
	selectors: Selector | Selector[],
	baseElement?: ParentNode
): TElement | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return undefined;
	}

	const all = (baseElement ?? document).querySelectorAll<TElement>(String(selectors));
	return all[all.length - 1];
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               Whether it's been found
 */
function selectExists(
	selectors: string | string[],
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
function selectAll<TElement extends Element = HTMLElement>(
	selectors: string | string[],
	baseElements?: BaseElements
): TElement[];
function selectAll<
	Selector extends string,
	TElement extends Element = ParseSelector<Selector>
>(
	selectors: Selector | Selector[],
	baseElements?: BaseElements
): TElement[] {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		return [];
	}

	// Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
	if (!baseElements || isQueryable(baseElements)) {
		const elements = (baseElements ?? document).querySelectorAll<TElement>(String(selectors));
		return [...elements];
	}

	const queried = new Set<TElement>();
	for (const baseElement of baseElements) {
		for (const element of baseElement.querySelectorAll<TElement>(String(selectors))) {
			queried.add(element);
		}
	}

	return [...queried]; // Convert to array
}

select.last = selectLast;
select.exists = selectExists;
select.all = selectAll;

export default select;
