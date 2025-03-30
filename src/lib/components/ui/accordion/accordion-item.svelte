<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AccordionRootBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AccordionRootBaseProps = {
		/**
		 * The unique value of the accordion item. This is used to identify when the
		 * item is open or closed.
		 * @required
		 */
		value: string;

		/**
		 * Whether or not the accordion item is disabled. When disabled,
		 * the accordion item cannot be interacted with.
		 * @defaultValue `false`
		 */
		disabled?: boolean;
	};

	export type AccordionItemProps = AccordionRootBaseAttributes & AccordionRootBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		value,
		disabled = false,
		...restProps
	}: AccordionItemProps = $props();

	let itemState = $state<'open' | 'closed'>('closed');

	const itemProps = $derived({
		'class': cn('border-b', className),
		'data-orientation': orientation === 'horizontal' ? orientation : undefined,
		'data-disabled': disabled === true || undefined,
		'data-state': itemState,
		...restProps,
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
