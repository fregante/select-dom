import {expectType} from 'tsd';
import select from '.';

// `select-dom` defaults to HTMLElement where possible
// because it's the most common use case, even if
// technically this should not be HTMLElement.

/**
 * SELECT
 */
expectType<Element | null>(select('.wow'));
expectType<HTMLElement | null>(select('.wow'));
expectType<HTMLAnchorElement | null>(select<HTMLAnchorElement>('.wow'));

expectType<HTMLElement | null>(select('base'));
expectType<HTMLBaseElement | null>(select('base'));

expectType<SVGElement | null>(select('g'));
expectType<SVGGElement | null>(select('g'));

/**
 * LAST
 */
expectType<Element | null>(select.last('.wow'));
expectType<HTMLElement | null>(select.last('.wow'));
expectType<HTMLAnchorElement | null>(select.last<HTMLAnchorElement>('.wow'));

expectType<HTMLElement | null>(select.last('base'));
expectType<HTMLBaseElement | null>(select.last('base'));

expectType<SVGElement | null>(select.last('g'));
expectType<SVGGElement | null>(select.last('g'));

/**
 * EXISTS
 */
expectType<boolean>(select.exists('.wow'));
expectType<boolean>(select.exists('base'));
expectType<boolean>(select.exists('g'));

/**
 * ALL
 */
expectType<any[]>(select.all('.wow'));
expectType<Element[]>(select.all('.wow'));
expectType<HTMLElement[]>(select.all('.wow'));

expectType<HTMLElement[]>(select.all('base'));
expectType<HTMLBaseElement[]>(select.all('base'));

expectType<SVGElement[]>(select.all('g'));
expectType<SVGGElement[]>(select.all('g'));
expectType<HTMLAnchorElement[]>(select.all<HTMLAnchorElement>('.wow'));
