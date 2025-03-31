import Content, { type AccordionContentProps } from './accordion-content.svelte';
import Header, { type AccordionHeaderProps } from './accordion-header.svelte';
import Item, { type AccordionItemProps } from './accordion-item.svelte';
import Trigger, { type AccordionTriggerProps } from './accordion-trigger.svelte';
import Root, { type AccordionRootProps } from './accordion.svelte';

export {
	Root as Accordion,
	Content as AccordionContent,
	Header as AccordionHeader,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
	Content,
	Header,
	Item,
	Root,
	Trigger,
	type AccordionContentProps,
	type AccordionHeaderProps,
	type AccordionItemProps,
	type AccordionRootProps,
	type AccordionTriggerProps,
	type AccordionContentProps as ContentProps,
	type AccordionHeaderProps as HeaderProps,
	type AccordionItemProps as ItemProps,
	type AccordionRootProps as RootProps,
	type AccordionTriggerProps as TriggerProps,
};
