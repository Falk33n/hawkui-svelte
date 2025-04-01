<script
	lang="ts"
	module
>
	import type { HeadingLevels, WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AlertTitleBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLHeadingElement>>,
		HTMLHeadingElement
	>;

	type AlertTitleBaseProps = {
		/**
		 * The heading element level to be used.
		 * @defaultValue `"h5"`
		 */
		level?: HeadingLevels;
	};

	export type AlertTitleProps = AlertTitleBaseAttributes & AlertTitleBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		level = 'h5',
		...restProps
	}: AlertTitleProps = $props();

	const titleProps = $derived<HTMLAttributes<HTMLHeadingElement>>({
		class: cn('mb-1 leading-none font-medium tracking-tight', className),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...titleProps } })}
{:else}
	<svelte:element
		this={level}
		bind:this={ref}
		{...titleProps}
	>
		{@render children?.()}
	</svelte:element>
{/if}
