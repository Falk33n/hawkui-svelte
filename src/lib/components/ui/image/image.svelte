<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef, WithoutChildren } from '$lib/types';
	import type { HTMLImgAttributes } from 'svelte/elements';

	export type ImageProps = WithElementRef<
		WithoutChildren<WithChild<HTMLImgAttributes>>,
		HTMLImageElement
	>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	// This is only a basic img element, only difference is that we
	// add some security attributes to it.
	let {
		ref = $bindable(null),
		child,
		class: className,
		loading = 'lazy',
		referrerpolicy = 'no-referrer',
		crossorigin = 'anonymous',
		...restProps
	}: ImageProps = $props();

	const imageProps = $derived<HTMLImgAttributes>({
		class: className ? cn(className) : undefined,
		loading,
		referrerpolicy,
		crossorigin,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...imageProps } })}
{:else}
	<img
		bind:this={ref}
		{...imageProps}
	/>
{/if}
