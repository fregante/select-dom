import type {ParseSelector} from 'typed-query-selector/parser';

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
function select
<S extends string, E extends Element = ParseSelector<S>>(selectors: S | S[], baseElement?: ParentNode): E | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return;
	}

	return (baseElement ?? document).querySelector<E>(String(selectors)) ?? undefined;
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function selectLast
<S extends string, E extends Element = ParseSelector<S>>(selectors: S | S[], baseElement?: ParentNode): E | undefined {
	// Shortcut with specified-but-null baseElement
	if (arguments.length === 2 && !baseElement) {
		return undefined;
	}

	const all = (baseElement ?? document).querySelectorAll<E>(String(selectors));
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
function selectAll
<S extends string, E extends Element = ParseSelector<S>>(selectors: S | S[], baseElements?: BaseElements): E[] {
	// Shortcut with specified-but-null baseElements
	if (arguments.length === 2 && !baseElements) {
		return [];
	}

	// Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
	if (!baseElements || isQueryable(baseElements)) {
		const elements = (baseElements ?? document).querySelectorAll<E>(String(selectors));
		return [...elements];
	}

	const queried = new Set<E>();
	for (const baseElement of baseElements) {
		for (const element of baseElement.querySelectorAll<E>(String(selectors))) {
			queried.add(element);
		}
	}

	return [...queried]; // Convert to array
}

select.last = selectLast;
select.exists = selectExists;
select.all = selectAll;

export default select;
