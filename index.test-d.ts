import {expectType} from 'tsd';
import select from '.';

// `select-dom` defaults to HTMLElement where possible
// because it's the most common use case, even if
// technically this should not be HTMLElement.

/**
 * SELECT
 */
expectType<HTMLElement | null>(select('.wow'));
expectType<HTMLAnchorElement | null>(select<HTMLAnchorElement>('.wow'));

expectType<HTMLBaseElement | null>(select('base'));

expectType<SVGGElement | null>(select('g'));

/**
 * LAST
 */
expectType<HTMLElement | null>(select.last('.wow'));
expectType<HTMLAnchorElement | null>(select.last<HTMLAnchorElement>('.wow'));
expectType<HTMLBaseElement | null>(select.last('base'));
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
expectType<HTMLElement[]>(select.all('.wow'));
expectType<HTMLBaseElement[]>(select.all('base'));
expectType<SVGGElement[]>(select.all('g'));
expectType<HTMLAnchorElement[]>(select.all<HTMLAnchorElement>('.wow'));
