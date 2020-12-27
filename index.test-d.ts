import {expectType} from 'tsd';
import select from '.';

// `select-dom` defaults to HTMLElement where possible because it's the most common use case, even if technically this should not be HTMLElement.

/**
 * SELECT
 */
expectType<HTMLElement | undefined>(select('.wow'));
expectType<HTMLAnchorElement | undefined>(select('a.wow'));

expectType<HTMLBaseElement | undefined>(select('base'));

expectType<SVGGElement | undefined>(select('g'));

/**
 * LAST
 */
expectType<HTMLElement | undefined>(select.last('.wow'));
expectType<HTMLAnchorElement | undefined>(select.last('a.wow'));
expectType<HTMLBaseElement | undefined>(select.last('base'));
expectType<SVGGElement | undefined>(select.last('g'));

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
expectType<HTMLAnchorElement[]>(select.all('a.wow'));
