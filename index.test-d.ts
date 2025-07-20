import {expectType} from 'tsd';
import {$, $$, elementExists, lastElement, expectElement, expectLastElement} from './index.js';

// `select-dom` defaults to HTMLElement where possible because it's the most common use case, even if technically this should not be HTMLElement.

/**
 * SELECT
 */
expectType<HTMLElement | undefined>($('.wow'));
expectType<HTMLAnchorElement | undefined>($('a.wow'));
expectType<HTMLBaseElement | undefined>($('base'));
expectType<SVGGElement | undefined>($('g'));

/**
 * EXPECT
 */
expectType<HTMLElement>(expectElement('.wow'));
expectType<HTMLAnchorElement>(expectElement('a.wow'));
expectType<HTMLBaseElement>(expectElement('base'));
expectType<SVGGElement>(expectElement('g'));

/**
 * LAST
 */
expectType<HTMLElement | undefined>(lastElement('.wow'));
expectType<HTMLAnchorElement | undefined>(lastElement('a.wow'));
expectType<HTMLBaseElement | undefined>(lastElement('base'));
expectType<SVGGElement | undefined>(lastElement('g'));

/**
 * EXPECT LAST
 */
expectType<HTMLElement>(expectLastElement('.wow'));
expectType<HTMLAnchorElement>(expectLastElement('a.wow'));
expectType<HTMLBaseElement>(expectLastElement('base'));
expectType<SVGGElement>(expectLastElement('g'));

/**
 * EXISTS
 */
expectType<boolean>(elementExists('.wow'));
expectType<boolean>(elementExists('base'));
expectType<boolean>(elementExists('g'));

/**
 * ALL
 */
expectType<HTMLElement[]>($$('.wow'));
expectType<HTMLBaseElement[]>($$('base'));
expectType<SVGGElement[]>($$('g'));
expectType<HTMLAnchorElement[]>($$('a.wow'));
