<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AlertDescriptionProps = WithElementRef<
		WithChild<HTMLAttributes<HTMLParagraphElement>>,
		HTMLParagraphElement
	>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		...restProps
	}: AlertDescriptionProps = $props();

	const descriptionProps = $derived<HTMLAttributes<HTMLParagraphElement>>({
		class: cn('text-sm', '[&_p]:leading-relaxed', className),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...descriptionProps } })}
{:else}
	<p
		bind:this={ref}
		{...descriptionProps}
	>
		{@render children?.()}
	</p>
{/if}
