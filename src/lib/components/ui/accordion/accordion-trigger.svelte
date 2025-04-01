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
	import { useAccordionTrigger } from './context';

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
		rootType,
		rootValue,
		rootDisabled,
		rootCollapsible,
		itemDisabled,
		itemValue,
		itemState,
		triggerId,
		contentId,
	} = useAccordionTrigger();

	function handleOnValueChange() {
		if (rootType === 'single') {
			if (itemState.current === 'closed') {
				rootValue.current = itemValue;
				return;
			}

			if (rootCollapsible) {
				rootValue.current = '';
			}

			return;
		}

		if (itemState.current === 'closed') {
			rootValue.current.push(itemValue);
			return;
		}

		const itemIndex = rootValue.current.findIndex((item) => item === itemValue);

		if (itemIndex !== -1) {
			rootValue.current.splice(itemIndex, 1);
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
			'group-data-[state=open]:[&>svg]:-rotate-180',
			'group-data-[disabled-item=true]:pointer-events-none group-data-[disabled-item=true]:opacity-70',
			'group-data-[disabled-root=true]:pointer-events-none group-data-[disabled-root=true]:opacity-70',
			disabled && 'pointer-events-none opacity-70',
			className,
		),
		'disabled': rootDisabled || itemDisabled || disabled || undefined,
		'aria-expanded': itemState.current === 'open',
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
				class="text-muted-foreground size-4 shrink-0 transition-transform duration-200"
				aria-hidden
			/>
		</button>
	{/if}
</AccordionHeader>
