<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useAvatarRoot, type AvatarLoadingStatus } from './context.svelte';

	type AvatarRootBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AvatarRootBaseProps = {
		/**
		 * The loading status of the avatars source image. You can bind a variable to
		 * track the status outside of the component and use it to show a loading
		 * indicator or error message.
		 *
		 * @defaultValue `"loading"`
		 */
		loadingStatus?: AvatarLoadingStatus;

		/**
		 * How long to wait before showing the image after it has loaded. This can be useful to
		 * prevent a harsh flickering effect when the image loads quickly.
		 * @defaultValue `0`
		 */
		delayMs?: number;

		/**
		 * A callback function called when the loading status of the image changes.
		 */
		onLoadingStatusChange?: (loadingStatus: AvatarLoadingStatus) => void;
	};

	export type AvatarRootProps = AvatarRootBaseAttributes & AvatarRootBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		loadingStatus: initialLoadingStatus = $bindable('loading'),
		children,
		child,
		onLoadingStatusChange,
		class: className,
		delayMs = 0,
		...restProps
	}: AvatarRootProps = $props();

	const rootProps = $derived<HTMLAttributes<HTMLDivElement>>({
		class: cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'),
		...restProps,
	});

	const { loadingStatus } = useAvatarRoot({
		loadingStatus: initialLoadingStatus,
		delayMs,
		onLoadingStatusChange,
	});

	$effect(() => {
		// To make sure that people using the binding will have the correct value.
		initialLoadingStatus = loadingStatus.current;
	});
</script>

{#if child}
	{@render child({ props: { ref, ...rootProps } })}
{:else}
	<div
		bind:this={ref}
		{...rootProps}
	>
		{@render children?.()}
	</div>
{/if}
