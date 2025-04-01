import type { AsReactive, PickAndNever, PickAndRequire, Reactive } from '$lib/types';
import { createId } from '$lib/utils';
import { getContext, hasContext, setContext } from 'svelte';
import type { AccordionRootProps } from './accordion.svelte';

const ACCORDION_ROOT_CONTEXT_KEY = Symbol('hawk-accordion-root-key');
const ACCORDION_ITEM_CONTEXT_KEY = Symbol('hawk-accordion-item-key');

//
// TYPES FOR ROOT CONTEXT
//

type AccordionRootBaseContext = {
	/**
	 * Whether or not the accordion is disabled. When disabled, the accordion
	 * cannot be interacted with.
	 * @defaultValue `false`
	 */
	rootDisabled: boolean;
};

type AccordionRootTypeSingleContext = AccordionRootBaseContext &
	PickAndRequire<AccordionRootProps, 'collapsible'> & {
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
		onRootValueChange?: (rootValue: string) => void;
	};

type AccordionRootTypeMultipleContext = AccordionRootBaseContext &
	PickAndNever<AccordionRootProps, 'collapsible'> & {
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
		onRootValueChange?: (rootValue: string[]) => void;
	};

export type AccordionRootContextInput =
	| AccordionRootTypeSingleContext
	| AccordionRootTypeMultipleContext;

type AccordionRootContextOutput = AsReactive<AccordionRootContextInput, 'rootValue'> & {
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
	itemDisabled: boolean;
};

type AccordionItemBaseContextOutput = AccordionItemContextInput & {
	/** The reactive value used to identify the open or closed state of the item. */
	itemOpen: Reactive<boolean>;

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

type AccordionItemContextOutput = AccordionRootContextOutput & AccordionItemBaseContextOutput;

//
// GETTER FUNCTIONS FOR CONTEXT
//

export function useAccordionRoot(props: AccordionRootContextInput) {
	const { rootValue: initialRootValue, ...restProps } = props;
	const isRootTypeMultiple = Array.isArray(initialRootValue);

	const rootValue = $state<Reactive<string | string[]>>({ current: initialRootValue });

	return setContext<AccordionRootContextOutput>(ACCORDION_ROOT_CONTEXT_KEY, {
		rootValue,
		isRootTypeMultiple,
		...restProps,
	});
}

export function useAccordionItem(props: AccordionItemContextInput) {
	if (!hasContext(ACCORDION_ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	}

	const { rootDefaultValue, ...restRootProps } = getContext<AccordionRootContextOutput>(
		ACCORDION_ROOT_CONTEXT_KEY,
	);

	const isItemValueSameAsRootDefaultValue =
		props.itemValue === rootDefaultValue || rootDefaultValue.includes(props.itemValue);

	const itemOpen = $state<Reactive<boolean>>({
		current: isItemValueSameAsRootDefaultValue,
	});

	const triggerId = createId();
	const contentId = createId();

	return setContext<AccordionItemContextOutput>(ACCORDION_ITEM_CONTEXT_KEY, {
		rootDefaultValue,
		itemOpen,
		triggerId,
		contentId,
		...restRootProps,
		...props,
	});
}

export function useAccordionHeader() {
	if (!hasContext(ACCORDION_ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	}

	if (!hasContext(ACCORDION_ITEM_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Item component.',
		);
	}

	return getContext<AccordionItemContextOutput>(ACCORDION_ITEM_CONTEXT_KEY);
}

export { useAccordionHeader as useAccordionTrigger };

export { useAccordionHeader as useAccordionContent };
