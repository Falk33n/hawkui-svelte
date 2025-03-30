import type { Reactive } from '$lib/types';
import { getContext, hasContext, setContext } from 'svelte';

const ROOT_CONTEXT_KEY = 'hawk-accordion-root-key';
const ITEM_CONTEXT_KEY = 'hawk-accordion-item-key';

type AccordionRootContext = {
	rootOrientation: 'vertical' | 'horizontal';
	rootDisabled: boolean;
	rootType: 'single' | 'multiple';
	rootValue: Reactive<string | string[]>;
	rootDefaultValue: string | string[];
	rootOnValueChange?: (value: string | string[]) => void;
	rootCollapsible: boolean;
};

export function useAccordionRoot(props: AccordionRootContext) {
	return setContext(ROOT_CONTEXT_KEY, props);
}

type AccordionItemContext = {};

export function useAccordionItem(props: AccordionItemContext) {
	if (!hasContext(ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Accordion.Root component.',
		);
	}

	const rootContext = getContext<AccordionRootContext>(ROOT_CONTEXT_KEY);

	return setContext<AccordionItemContext>(ITEM_CONTEXT_KEY, { ...rootContext, ...props });
}
