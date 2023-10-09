import {expectType} from 'tsd';
import {$, $$, $exists, $last} from './index.js';

// `$-dom` defaults to HTMLElement where possible because it's the most common use case, even if technically this should not be HTMLElement.

/**
 * SELECT
 */
expectType<HTMLElement | undefined>($('.wow'));
expectType<HTMLAnchorElement | undefined>($('a.wow'));

expectType<HTMLBaseElement | undefined>($('base'));

expectType<SVGGElement | undefined>($('g'));

/**
 * LAST
 */
expectType<HTMLElement | undefined>($last('.wow'));
expectType<HTMLAnchorElement | undefined>($last('a.wow'));
expectType<HTMLBaseElement | undefined>($last('base'));
expectType<SVGGElement | undefined>($last('g'));

/**
 * EXISTS
 */
expectType<boolean>($exists('.wow'));
expectType<boolean>($exists('base'));
expectType<boolean>($exists('g'));

/**
 * ALL
 */
expectType<HTMLElement[]>($$('.wow'));
expectType<HTMLBaseElement[]>($$('base'));
expectType<SVGGElement[]>($$('g'));
expectType<HTMLAnchorElement[]>($$('a.wow'));
