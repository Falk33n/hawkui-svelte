<script
	lang="ts"
	module
>
	import type { HeadingLevels, WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AccordionHeaderBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLHeadingElement>>,
		HTMLHeadingElement
	>;

	type AccordionHeaderBaseProps = {
		/**
		 * The heading element level to be used.
		 * @defaultValue `"h3"`
		 */
		level?: HeadingLevels;
	};

	export type AccordionHeaderProps = AccordionHeaderBaseAttributes & AccordionHeaderBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		level = 'h3',
		...restProps
	}: AccordionHeaderProps = $props();

	const headerProps = $derived<HTMLAttributes<HTMLHeadingElement>>({
		class: cn('flex', 'group-data-[open=true]:border-b', className),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...headerProps } })}
{:else}
	<svelte:element
		this={level}
		bind:this={ref}
		{...headerProps}
	>
		{@render children?.()}
	</svelte:element>
{/if}
