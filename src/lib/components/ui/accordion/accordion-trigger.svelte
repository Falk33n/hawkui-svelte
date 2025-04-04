<script
	lang="ts"
	module
>
	import type { ButtonMouseEvent, WithChild, WithElementRef } from '$lib/types';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import AccordionHeader, { type AccordionHeaderProps } from './accordion-header.svelte';

	type AccordionTriggerBaseAttributes = WithElementRef<
		WithChild<HTMLButtonAttributes>,
		HTMLButtonElement
	>;

	type AccordionTriggerBaseProps = {
		/**
		 * The props used for the header component that is wrapped around the trigger.
		 */
		headerProps?: AccordionHeaderProps;
	};

	export type AccordionTriggerProps = AccordionTriggerBaseAttributes & AccordionTriggerBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { useAccordionTrigger } from './context.svelte';

	let {
		ref = $bindable(null),
		children,
		child,
		onclick,
		class: className,
		disabled = false,
		headerProps,
		...restProps
	}: AccordionTriggerProps = $props();

	const {
		isRootTypeMultiple,
		rootValue,
		rootDisabled,
		itemDisabled,
		itemValue,
		itemOpen,
		triggerId,
		contentId,
		collapsible,
	} = useAccordionTrigger();

	function handleOnValueChange() {
		if (!isRootTypeMultiple) {
			if (!itemOpen.current) {
				rootValue.current = itemValue;
				return;
			}

			if (collapsible) {
				rootValue.current = '';
			}

			return;
		}

		if (Array.isArray(rootValue.current)) {
			if (!itemOpen.current) {
				rootValue.current.push(itemValue);
				return;
			}

			const itemIndex = rootValue.current.findIndex((item) => item === itemValue);

			if (itemIndex !== -1) {
				rootValue.current.splice(itemIndex, 1);
			}
		}
	}

	function handleOnClick(e: ButtonMouseEvent) {
		if (!e.defaultPrevented) handleOnValueChange();
		onclick?.(e);
	}

	const triggerProps = $derived<HTMLButtonAttributes>({
		'class': cn(
			'flex flex-1 cursor-pointer items-center justify-between p-4 text-sm font-medium transition-all transition-opacity duration-200',
			'hover:underline hover:underline-offset-4',
			itemOpen.current && '[&>svg]:-rotate-180',
			disabled && 'pointer-events-none opacity-70',
			className,
		),
		'disabled': rootDisabled || itemDisabled || disabled || undefined,
		'aria-expanded': itemOpen.current,
		'aria-controls': contentId,
		'id': triggerId,
		'type': 'button',
		'onclick': handleOnClick,
		...restProps,
	});
</script>

<AccordionHeader {...headerProps}>
	{#if child}
		{@render child({ props: { ref, ...triggerProps } })}
	{:else}
		<button
			bind:this={ref}
			{...triggerProps}
		>
			{@render children?.()}

			<ChevronDownIcon
				class="size-4 text-muted-foreground transition-transform duration-200 shrink-0"
				aria-hidden
			/>
		</button>
	{/if}
</AccordionHeader>
