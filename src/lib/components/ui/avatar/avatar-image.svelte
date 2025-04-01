<script
	lang="ts"
	module
>
	import { Image, type ImageProps } from '../image';

	export type AvatarImageProps = ImageProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		child,
		class: className,
		...restProps
	}: AvatarImageProps = $props();

	const imageProps = $derived<ImageProps>({
		class: cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'),
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...imageProps } })}
{:else}
	<Image
		bind:ref
		{...imageProps}
	/>
{/if}
