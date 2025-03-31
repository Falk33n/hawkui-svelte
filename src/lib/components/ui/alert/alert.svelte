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
	const alertVariants = tv({
		base: cn(
			'bg-card relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
			'has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3',
			'[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
		),
		variants: {
			variant: {
				info: 'text-card-foreground',
				destructive: cn(
					'text-destructive',
					'*:data-[slot=alert-description]:text-destructive/90',
					'[&>svg]:text-current',
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
