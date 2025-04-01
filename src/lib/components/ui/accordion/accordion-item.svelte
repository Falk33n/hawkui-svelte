<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AccordionItemBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AccordionItemBaseProps = {
		/**
		 * The unique value of the accordion item. This is used to identify when the
		 * item is open or closed. If left undefined it will be generated automatically.
		 */
		value?: string;

		/**
		 * Whether or not the accordion item is disabled. When disabled,
		 * the accordion item cannot be interacted with.
		 * @defaultValue `false`
		 */
		disabled?: boolean;
	};

	export type AccordionItemProps = AccordionItemBaseAttributes & AccordionItemBaseProps;
</script>

<script lang="ts">
	import { cn, createId } from '$lib/utils';
	import { useAccordionItem } from './context.svelte';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		value = createId(),
		disabled = false,
		...restProps
	}: AccordionItemProps = $props();

	const { rootValue, rootDisabled, onRootValueChange, itemOpen } = useAccordionItem({
		itemDisabled: disabled,
		itemValue: value,
	});

	const itemProps = $derived<HTMLAttributes<HTMLDivElement>>({
		'class': cn(
			'group border-b transition-opacity duration-200',
			disabled && 'pointer-events-none opacity-70',
			className,
		),
		'aria-disabled': rootDisabled || disabled || undefined,
		...restProps,
	});

	$effect(() => {
		const isValueSameAsRootValue =
			value === rootValue.current || rootValue.current.includes(value);

		itemOpen.current = isValueSameAsRootValue;

		// TypeScript can't infer the single or multiple types.
		onRootValueChange?.(rootValue.current as any);
	});
</script>

{#if child}
	{@render child({ props: { ref, ...itemProps } })}
{:else}
	<div
		bind:this={ref}
		{...itemProps}
	>
		{@render children?.()}
	</div>
{/if}
