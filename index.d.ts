// https://github.com/Microsoft/TypeScript/blob/9d3707d671592d030386956c9ce39e539b8d0972/src/lib/dom.generated.d.ts#L10581

export interface SelectDom {
	<K extends keyof HTMLElementTagNameMap>(selectors: K, parent?: Element): HTMLElementTagNameMap[K] | null;
	<K extends keyof SVGElementTagNameMap>(selectors: K, parent?: Element): SVGElementTagNameMap[K] | null;
	<E extends Element = Element>(selectors: string, parent?: Element): E | null;
	exists<K extends keyof HTMLElementTagNameMap>(selectors: K, parent?: Element): boolean;
	exists<K extends keyof SVGElementTagNameMap>(selectors: K, parent?: Element): boolean;
	exists<E extends Element = Element>(selectors: string, parent?: Element): boolean;
	all<K extends keyof HTMLElementTagNameMap>(selectors: K, parents?: Element|Element[]): HTMLElementTagNameMap[K][];
	all<K extends keyof SVGElementTagNameMap>(selectors: K, parents?: Element|Element[]): SVGElementTagNameMap[K][];
	all<E extends Element = Element>(selectors: string, parents?: Element|Element[]): E[];
}
