<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AspectRatioBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AspectRatioBaseProps = {
		/**
		 * The desired ratio to be used.
		 * @defaultValue `4 / 3`
		 */
		ratio?: number;
	};

	export type AspectRatioProps = AspectRatioBaseAttributes & AspectRatioBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		style,
		ratio = 4 / 3,
		...restProps
	}: AspectRatioProps = $props();

	const rootProps = $derived({
		class: cn('relative w-full', className),
		style: `padding-bottom: ${ratio / 100}px; ${style}`,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...rootProps } })}
{:else}
	<div
		bind:this={ref}
		{...rootProps}
	>
		<div class="absolute inset-0">
			{@render children?.()}
		</div>
	</div>
{/if}
