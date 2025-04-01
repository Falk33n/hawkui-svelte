<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	/**
	 * Style variants for the alert component.
	 * @property `"variant"` The color styles of the alert component.
	 * @defaultValue `"info"`
	 */
	export const alertVariants = tv({
		base: cn(
			'relative w-full rounded-lg border px-4 py-3 text-sm',
			'[&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:size-4 [&>svg~*]:pl-7',
			'[&>svg+div]:translate-y-[-3px]',
		),
		variants: {
			variant: {
				info: 'bg-background text-card-foreground [&>svg]:text-foreground',
				destructive: cn(
					'text-destructive-foreground bg-destructive',
					'[&>svg]:text-destructive-foreground',
				),
			},
		},
		defaultVariants: {
			variant: 'info',
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>['variant'];

	type AlertRootBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AlertRootBaseProps = {
		/**
		 * The color styles of the alert component.
		 * @defaultValue `"info"`
		 */
		variant?: AlertVariant;
	};

	export type AlertRootProps = AlertRootBaseAttributes & AlertRootBaseProps;
</script>

<script lang="ts">
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import TerminalIcon from '@lucide/svelte/icons/terminal';

	let {
		ref = $bindable(null),
		children,
		child,
		class: className,
		variant = 'info',
		...restProps
	}: AlertRootProps = $props();

	const rootProps = $derived({
		class: cn(alertVariants({ variant }), className),
		role: 'alert',
		...restProps,
	});

	const Icon = $derived(variant === 'info' ? TerminalIcon : CircleAlertIcon);
</script>

{#if child}
	{@render child({ props: { ref, ...rootProps } })}
{:else}
	<div
		bind:this={ref}
		{...rootProps}
	>
		<Icon aria-hidden />

		{@render children?.()}
	</div>
{/if}
