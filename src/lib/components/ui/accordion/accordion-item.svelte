<script
	lang="ts"
	module
>
	import type { Reactive, WithChild, WithElementRef } from '$lib/types';
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
	import { useAccordionItem } from './context';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		value = createId(),
		disabled = false,
		...restProps
	}: AccordionItemProps = $props();

	let itemState = $state<Reactive<'open' | 'closed'>>({
		current: 'closed',
	});

	const { rootValue, rootDefaultValue, rootOnValueChange } = useAccordionItem({
		itemDisabled: disabled,
		itemValue: value,
		itemState,
		triggerId: createId(),
		contentId: createId(),
	});

	const itemProps = $derived<HTMLAttributes<HTMLDivElement>>({
		'class': cn(
			'group border-b transition-opacity duration-200',
			'data-[disabled-item=true]:pointer-events-none data-[disabled-item=true]:opacity-70',
			'group-data-[disabled-root=true]:pointer-events-none group-data-[disabled-root=true]:opacity-70',
			className,
		),
		'data-disabled-item': disabled || undefined,
		'data-state': itemState.current,
		...restProps,
	});

	let hasMounted = false;

	$effect(() => {
		const isValueSameAsRootDefaultValue =
			value === rootDefaultValue || rootDefaultValue.includes(value);

		const isValueSameAsRootValue =
			value === rootValue.current || rootValue.current.includes(value);

		// Default value should only be relevant on the initial render.
		itemState.current =
			(!hasMounted && isValueSameAsRootDefaultValue) || isValueSameAsRootValue
				? 'open'
				: 'closed';

		if (!hasMounted) hasMounted = true;

		// TypeScript can't infer the single or multiple types.
		rootOnValueChange?.(itemState.current as any);
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
