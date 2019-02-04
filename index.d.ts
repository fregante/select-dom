// https://github.com/Microsoft/TypeScript/blob/9d3707d671592d030386956c9ce39e539b8d0972/src/lib/dom.generated.d.ts#L10581

type BaseElements = Element | Element[] | NodeList | DocumentFragment;

export default interface SelectDom {
	<K extends keyof HTMLElementTagNameMap>(
		selectors: K,
		baseElement?: Element
	): HTMLElementTagNameMap[K] | null;
	<K extends keyof SVGElementTagNameMap>(
		selectors: K,
		baseElement?: Element
	): SVGElementTagNameMap[K] | null;
	<E extends Element = Element>(
		selectors: string,
		baseElement?: Element
	): E | null;
	exists<K extends keyof HTMLElementTagNameMap>(
		selectors: K,
		baseElement?: Element
	): boolean;
	exists<K extends keyof SVGElementTagNameMap>(
		selectors: K,
		baseElement?: Element
	): boolean;
	exists<E extends Element = Element>(
		selectors: string,
		baseElement?: Element
	): boolean;
	all<K extends keyof HTMLElementTagNameMap>(
		selectors: K,
		baseElements?: BaseElements
	): HTMLElementTagNameMap[K][];
	all<K extends keyof SVGElementTagNameMap>(
		selectors: K,
		baseElements?: BaseElements
	): SVGElementTagNameMap[K][];
	all<E extends Element = Element>(
		selectors: string,
		baseElements?: BaseElements
	): E[];
}
