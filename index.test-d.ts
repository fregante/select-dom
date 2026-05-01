import {expectType} from 'tsd';
import {$, $$, $optional, $$optional, elementExists, assertElementExists, lastElement, lastElementOptional, $closest, $closestOptional} from './index.js';

// `select-dom` defaults to HTMLElement where possible because it's the most common use case, even if technically this should not be HTMLElement.

/**
 * SELECT (throws if not found)
 */
expectType<HTMLElement>($('.wow'));
expectType<HTMLAnchorElement>($('a.wow'));
expectType<HTMLBaseElement>($('base'));
expectType<SVGGElement>($('g'));

/**
 * LAST (throws if not found)
 */
expectType<HTMLElement>(lastElement('.wow'));
expectType<HTMLAnchorElement>(lastElement('a.wow'));
expectType<HTMLBaseElement>(lastElement('base'));
expectType<SVGGElement>(lastElement('g'));

/**
 * EXISTS
 */
expectType<boolean>(elementExists('.wow'));
expectType<boolean>(elementExists('base'));
expectType<boolean>(elementExists('g'));

/**
 * ASSERT EXISTS
 */
expectType<void>(assertElementExists('.wow'));
expectType<void>(assertElementExists('base'));
expectType<void>(assertElementExists('g'));

/**
 * ALL (throws if none found)
 */
expectType<HTMLElement[]>($$('.wow'));
expectType<HTMLBaseElement[]>($$('base'));
expectType<SVGGElement[]>($$('g'));
expectType<HTMLAnchorElement[]>($$('a.wow'));

/**
 * OPTIONAL (return undefined/empty instead of throwing)
 */
expectType<HTMLElement | undefined>($optional('.wow'));
expectType<HTMLAnchorElement | undefined>($optional('a.wow'));
expectType<HTMLElement[]>($$optional('.wow'));
expectType<HTMLAnchorElement[]>($$optional('a.wow'));
expectType<HTMLElement | undefined>(lastElementOptional('.wow'));
expectType<HTMLAnchorElement | undefined>(lastElementOptional('a.wow'));

/**
 * CLOSEST (throws if not found)
 */
expectType<HTMLElement>($closest('.wow', document.body));
expectType<HTMLAnchorElement>($closest('a.wow', document.body));
expectType<HTMLBaseElement>($closest('base', document.body));
expectType<SVGGElement>($closest('g', document.body));

/**
 * CLOSEST OPTIONAL (returns undefined if not found)
 */
expectType<HTMLElement | undefined>($closestOptional('.wow', document.body));
expectType<HTMLAnchorElement | undefined>($closestOptional('a.wow', document.body));
