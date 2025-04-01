<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type LinkBaseAttributes = WithElementRef<
		WithChild<Omit<HTMLAnchorAttributes, 'href'>>,
		HTMLAnchorElement
	>;

	type LinkBaseProps = { href: NonNullable<HTMLAnchorAttributes['href']> };

	export type LinkProps = LinkBaseAttributes & LinkBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	// This is only a basic anchor element, only difference is that we
	// add some security attributes to it.
	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		target,
		rel,
		...restProps
	}: LinkProps = $props();

	const linkProps = $derived<HTMLAnchorAttributes>({
		class: className ? cn(className) : undefined,
		rel: target === '_blank' ? (rel ?? 'noopener noreferrer') : rel,
		target,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: { ref, ...linkProps } })}
{:else}
	<a
		bind:this={ref}
		{...linkProps}
	>
		{@render children?.()}
	</a>
{/if}
