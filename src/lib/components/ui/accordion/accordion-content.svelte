<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AccordionContentBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AccordionContentBaseProps = {
		/**
		 * Used to force mounting when more control is needed. Useful when
		 * controlling animation with Svelte animation libraries.
		 *
		 * If `true` this will remove the default animation logic of the content.
		 */
		forceMount?: boolean;
	};

	export type AccordionContentProps = AccordionContentBaseAttributes & AccordionContentBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { useAccordionContent } from './context.svelte';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		forceMount,
		...restProps
	}: AccordionContentProps = $props();

	const { isItemOpen, triggerId, contentId } = useAccordionContent();

	const contentProps = $derived<HTMLAttributes<HTMLDivElement>>({
		'class': cn('overflow-hidden text-sm', className),
		'hidden': forceMount ? undefined : !isItemOpen.current,
		'aria-labelledby': triggerId,
		'id': contentId,
		'role': 'region',
		...restProps,
	});

	if (!forceMount) {
		function setStyleVariables() {
			if (!ref) return;

			const rect = ref.getBoundingClientRect();
			const height = rect.height;

			ref.style.setProperty('--hawk-accordion-content-height', `${height}px`);
		}

		function toggleAnimation() {
			if (!ref) return;

			// Since hidden is set directly when itemState = 'closed' we need
			// to revert it back to false.
			if (!isItemOpen.current) {
				ref.hidden = false;
			}

			ref.classList.toggle('animate-accordion-open', isItemOpen.current);
			ref.classList.toggle('animate-accordion-close', !isItemOpen.current);

			if (!isItemOpen.current) {
				// To make the animation have enough time to finish.
				const delaySetHidden = setTimeout(() => {
					if (!ref) return;
					ref.hidden = true;
				}, 200);

				return () => clearTimeout(delaySetHidden);
			}
		}

		let hasSetStyleVariables = false;

		$effect(() => {
			if (!hasSetStyleVariables && isItemOpen.current) {
				setStyleVariables();
				hasSetStyleVariables = true;
			}

			// The animation is dependent on the CSS variables.
			if (hasSetStyleVariables) toggleAnimation();
		});
	}
</script>

{#if child}
	{@render child({ props: { ref, ...contentProps } })}
{:else}
	<div
		bind:this={ref}
		{...contentProps}
	>
		<div class="p-4">
			{@render children?.()}
		</div>
	</div>
{/if}
