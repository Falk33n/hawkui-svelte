import type { Reactive } from '$lib/types';
import { getContext, hasContext, setContext } from 'svelte';

const ROOT_CONTEXT_KEY = Symbol('hawk-accordion-root-key');
const ITEM_CONTEXT_KEY = Symbol('hawk-accordion-item-key');

//
// TYPES FOR ROOT CONTEXT
//

type AccordionRootBaseContext = {
	/**
	 * Whether or not the accordion is disabled. When disabled, the accordion
	 * cannot be interacted with.
	 * @defaultValue `false`
	 */
	isRootDisabled: boolean;
};

type AccordionRootTypeSingleContext = AccordionRootBaseContext & {
	/**
	 * The value of the currently active accordion item.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootValue: string;

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
	isCollapsible: boolean;
};

type AccordionRootTypeMultipleContext = AccordionRootBaseContext & {
	/**
	 * The value of the currently active accordion item.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootValue: string[];

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
	isCollapsible?: never;
};

export type AccordionRootContextInput =
	| AccordionRootTypeSingleContext
	| AccordionRootTypeMultipleContext;

type AccordionRootContextOutput = Omit<AccordionRootContextInput, 'rootValue'> & {
	/**
	 * The reactive value of the currently active accordion item.
	 *
	 * If `type` is `"single"`, this should be a string.
	 *
	 * If `type` is `"multiple"`, this should be an array of strings.
	 */
	rootValue: Reactive<string | string[]>;

	/** To determine if the `type` of the accordion is set to `single` or `multiple`. */
	isRootTypeMultiple: boolean;
};

//
// TYPES FOR ITEM CONTEXT
//

type AccordionItemContextInput = {
	/**
	 * The unique value of the accordion item. This is used to identify when the
	 * item is open or closed.
	 */
	itemValue: string;

	/**
	 * Whether or not the accordion item is disabled. When disabled,
	 * the accordion item cannot be interacted with.
	 * @defaultValue `false`
	 */
	isItemDisabled: boolean;

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

type AccordionItemBaseContextOutput = {
	/** The reactive value used to identify the open or closed state of the item. */
	isItemOpen: Reactive<boolean>;
};

type AccordionItemContextOutput = AccordionRootContextOutput &
	Omit<AccordionItemContextInput, 'isItemOpen'> &
	AccordionItemBaseContextOutput;

//
// GETTER FUNCTIONS FOR CONTEXT
//

export function useAccordionRoot(props: AccordionRootContextInput) {
	const { rootValue: initialRootValue, ...restProps } = props;
	const isRootTypeMultiple = Array.isArray(initialRootValue);

	// eslint-disable-next-line prefer-const
	let rootValue = $state<Reactive<string | string[]>>({ current: initialRootValue });

	return setContext<AccordionRootContextOutput>(ROOT_CONTEXT_KEY, {
		rootValue,
		isRootTypeMultiple,
		...restProps,
	});
}

export function useAccordionItem(props: AccordionItemContextInput) {
	if (!hasContext(ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	}

	const { rootDefaultValue, ...restRootProps } =
		getContext<AccordionRootContextOutput>(ROOT_CONTEXT_KEY);

	const isItemValueSameAsRootDefaultValue =
		props.itemValue === rootDefaultValue || rootDefaultValue.includes(props.itemValue);

	// eslint-disable-next-line prefer-const
	let isItemOpen = $state<Reactive<boolean>>({
		current: isItemValueSameAsRootDefaultValue,
	});

	return setContext<AccordionItemContextOutput>(ITEM_CONTEXT_KEY, {
		rootDefaultValue,
		isItemOpen,
		...restRootProps,
		...props,
	});
}

export function useAccordionTrigger() {
	if (!hasContext(ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	}

	if (!hasContext(ITEM_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Item component.',
		);
	}

	return getContext<AccordionItemContextOutput>(ITEM_CONTEXT_KEY);
}

export { useAccordionTrigger as useAccordionContent };
