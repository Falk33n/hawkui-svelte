import type { Reactive } from '$lib/types';
import { getContext, hasContext, setContext } from 'svelte';

//
// ROOT CONTEXT
//

const ROOT_CONTEXT_KEY = 'hawk-accordion-root-key';

type AccordionRootBaseContext = {
	/**
	 * Whether or not the accordion is disabled. When disabled, the accordion
	 * cannot be interacted with.
	 * @defaultValue `false`
	 */
	rootDisabled: boolean;
};

type AccordionRootTypeSingleContext = {
	/**
	 * Determines whether one or multiple items can be opened at the same time.
	 *
	 * @required
	 */
	rootType: 'single';

	/**
	 * The reactive value of the currently active accordion item.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootValue: Reactive<string>;

	/**
	 * The default value of the accordion item to expand when initially rendered.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootDefaultValue: string;

	/**
	 * A callback function called when the active accordion item value changes.
	 *
	 * If `type` is `"single"`, the argument will be a string.
	 *
	 * If `type` is `"multiple"`, the argument will be an array of strings.
	 */
	rootOnValueChange?: (value: string) => void;

	/**
	 * When `type` is `"single"`, allows closing content when clicking the trigger for an open item.
	 * @defaultValue `true`
	 */
	rootCollapsible: boolean;
};

type AccordionRootTypeMultipleContext = {
	/**
	 * Determines whether one or multiple items can be opened at the same time.
	 *
	 * @required
	 */
	rootType: 'multiple';

	/**
	 * The reactive value of the currently active accordion item.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootValue: Reactive<string[]>;

	/**
	 * The default value of the accordion item to expand when initially rendered.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootDefaultValue: string[];

	/**
	 * A callback function called when the active accordion item value changes.
	 *
	 * If `type` is `"single"`, the argument will be a string.
	 *
	 * If `type` is `"multiple"`, the argument will be an array of strings.
	 */
	rootOnValueChange?: (value: string[]) => void;

	/**
	 * When `type` is `"single"`, allows closing content when clicking the trigger for an open item.
	 * @defaultValue `true`
	 */
	rootCollapsible?: never;
};

export type AccordionRootContext = AccordionRootBaseContext &
	(AccordionRootTypeSingleContext | AccordionRootTypeMultipleContext);

export function useAccordionRoot(props: AccordionRootContext) {
	return setContext(ROOT_CONTEXT_KEY, props);
}

//
// ITEM CONTEXT
//

const ITEM_CONTEXT_KEY = 'hawk-accordion-item-key';

type AccordionItemContext = {
	/**
	 * The unique value of the accordion item. This is used to identify when the
	 * item is open or closed.
	 */
	itemValue: string;

	/** The reactive value used to identify the open or closed state of the item. */
	itemState: Reactive<'open' | 'closed'>;

	/**
	 * Whether or not the accordion item is disabled. When disabled,
	 * the accordion item cannot be interacted with.
	 * @defaultValue `false`
	 */
	itemDisabled: boolean;

	/**
	 * The identifier of the trigger component. Used for accessability between
	 * the trigger and content components.
	 */
	triggerId: string;

	/**
	 * The identifier of the content component. Used for accessability between
	 * the trigger and content components.
	 */
	contentId: string;
};

type AccordionItemContextReturn = AccordionRootContext & AccordionItemContext;

export function useAccordionItem(props: AccordionItemContext) {
	if (!hasContext(ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	}

	const rootContext = getContext<AccordionRootContext>(ROOT_CONTEXT_KEY);

	return setContext<AccordionItemContextReturn>(ITEM_CONTEXT_KEY, { ...rootContext, ...props });
}

//
// TRIGGER CONTEXT
//

export function useAccordionTrigger() {
	if (!hasContext(ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	} else if (!hasContext(ITEM_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Item component.',
		);
	}

	return getContext<AccordionItemContextReturn>(ITEM_CONTEXT_KEY);
}

//
// CONTENT CONTEXT
//

export { useAccordionTrigger as useAccordionContent };
