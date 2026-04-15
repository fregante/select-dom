import {expectType} from 'tsd';
import {$, $$, $optional, $$optional, elementExists, assertElementExists, lastElement, lastElementOptional, expectElement, expectLastElement} from './index.js';

// `select-dom` defaults to HTMLElement where possible because it's the most common use case, even if technically this should not be HTMLElement.

/**
 * SELECT (throws if not found)
 */
expectType<HTMLElement>($('.wow'));
expectType<HTMLAnchorElement>($('a.wow'));
expectType<HTMLBaseElement>($('base'));
expectType<SVGGElement>($('g'));

/**
 * EXPECT (alias for $)
 */
expectType<HTMLElement>(expectElement('.wow'));
expectType<HTMLAnchorElement>(expectElement('a.wow'));
expectType<HTMLBaseElement>(expectElement('base'));
expectType<SVGGElement>(expectElement('g'));

/**
 * LAST (throws if not found)
 */
expectType<HTMLElement>(lastElement('.wow'));
expectType<HTMLAnchorElement>(lastElement('a.wow'));
expectType<HTMLBaseElement>(lastElement('base'));
expectType<SVGGElement>(lastElement('g'));

/**
 * EXPECT LAST (alias for lastElement)
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
 * OPTIONAL ALIASES (return undefined/empty instead of throwing)
 */
expectType<HTMLElement | undefined>($optional('.wow'));
expectType<HTMLAnchorElement | undefined>($optional('a.wow'));
expectType<HTMLElement[]>($$optional('.wow'));
expectType<HTMLAnchorElement[]>($$optional('a.wow'));
expectType<HTMLElement | undefined>(lastElementOptional('.wow'));
expectType<HTMLAnchorElement | undefined>(lastElementOptional('a.wow'));
