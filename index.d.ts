// https://github.com/Microsoft/TypeScript/blob/9d3707d671592d030386956c9ce39e539b8d0972/src/lib/dom.generated.d.ts#L10581

type BaseElement = Element | DocumentFragment;
type BaseElements = Element | Element[] | NodeList | DocumentFragment;

export interface SelectDom {
	<K extends keyof HTMLElementTagNameMap>(
		selectors: K,
		baseElement?: BaseElement
	): HTMLElementTagNameMap[K] | null;
	<K extends keyof SVGElementTagNameMap>(
		selectors: K,
		baseElement?: BaseElement
	): SVGElementTagNameMap[K] | null;
	<E extends HTMLElement = HTMLElement>(
		selectors: string,
		baseElement?: BaseElement
	): E | null;
	exists<K extends keyof HTMLElementTagNameMap>(
		selectors: K,
		baseElement?: BaseElement
	): boolean;
	exists<K extends keyof SVGElementTagNameMap>(
		selectors: K,
		baseElement?: BaseElement
	): boolean;
	exists<E extends HTMLElement = HTMLElement>(
		selectors: string,
		baseElement?: BaseElement
	): boolean;
	all<K extends keyof HTMLElementTagNameMap>(
		selectors: K,
		baseElements?: BaseElements
	): HTMLElementTagNameMap[K][];
	all<K extends keyof SVGElementTagNameMap>(
		selectors: K,
		baseElements?: BaseElements
	): SVGElementTagNameMap[K][];
	all<E extends HTMLElement = HTMLElement>(
		selectors: string,
		baseElements?: BaseElements
	): E[];
}

declare const select: SelectDom;

export default select
