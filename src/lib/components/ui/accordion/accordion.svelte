<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AccordionRootBaseAttributes = WithElementRef<
		WithChild<Omit<HTMLAttributes<HTMLDivElement>, 'dir'>>,
		HTMLDivElement
	>;

	type AccordionRootBaseProps = {
		/**
		 * Whether or not the accordion is disabled. When disabled, the accordion cannot be interacted with.
		 * @defaultValue `false`
		 */
		disabled?: boolean;

		/**
		 * The reading direction of the accordion when applicable.
		 * If omitted, assumes LTR (left-to-right) reading mode.
		 * @defaultValue `"ltr"`
		 */
		dir?: 'ltr' | 'rtl';

		/**
		 * The orientation of the accordion.
		 * @defaultValue `"vertical"`
		 */
		orientation?: 'vertical' | 'horizontal';
	};

	type AccordionRootTypeSingle = AccordionRootBaseProps & {
		/**
		 * Determines whether one or multiple items can be opened at the same time.
		 *
		 * @required
		 */
		type: 'single';

		/**
		 * The value of the currently active accordion item.
		 *
		 * If `type` is `"single"`, this should be a string.
		 *
		 * If type is `"multiple"`, this should be an array of strings.
		 */
		value?: string;

		/**
		 * The default value of the accordion item to expand when initially rendered.
		 *
		 * If `type` is `"single"`, this should be a string.
		 *
		 * If `type` is `"multiple"`, this should be an array of strings.
		 */
		defaultValue?: string;

		/**
		 * A callback function called when the active accordion item value changes.
		 *
		 * If the type is `"single"`, the argument will be a string.
		 *
		 * If type is `"multiple"`, the argument will be an array of strings.
		 */
		onValueChange?: (value: string) => void;

		/**
		 * When `type` is `"single"`, allows closing content when clicking the trigger for an open item.
		 * @defaultValue `false`
		 */
		collapsible?: boolean;
	};

	type AccordionRootTypeMultiple = AccordionRootBaseProps & {
		/**
		 * Determines whether one or multiple items can be opened at the same time.
		 *
		 * @required
		 */
		type: 'multiple';

		/**
		 * The value of the currently active accordion item.
		 *
		 * If `type` is `"single"`, this should be a string.
		 *
		 * If type is `"multiple"`, this should be an array of strings.
		 */
		value?: string[];

		/**
		 * The default value of the accordion item to expand when initially rendered.
		 *
		 * If `type` is `"single"`, this should be a string.
		 *
		 * If `type` is `"multiple"`, this should be an array of strings.
		 */
		defaultValue?: string[];

		/**
		 * A callback function called when the active accordion item value changes.
		 *
		 * If the type is `"single"`, the argument will be a string.
		 *
		 * If type is `"multiple"`, the argument will be an array of strings.
		 */
		onValueChange?: (value: string[]) => void;

		/**
		 * When `type` is `"single"`, allows closing content when clicking the trigger for an open item.
		 * @defaultValue `false`
		 */
		collapsible?: never;
	};

	export type AccordionRootProps = AccordionRootBaseAttributes &
		(AccordionRootTypeSingle | AccordionRootTypeMultiple);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { useAccordionRoot } from './context.svelte';

	let {
		ref = $bindable(null),
		value = $bindable(),
		children,
		child,
		class: className,
		defaultValue,
		type,
		onValueChange,
		collapsible,
		disabled = false,
		orientation = 'vertical',
		dir = 'ltr',
		...restProps
	}: AccordionRootProps = $props();

	// Sets the correct values depending on what type the accordion is.

	value =
		type === 'multiple'
			? Array.isArray(value)
				? value
				: []
			: typeof value === 'string' || value === undefined
				? value
				: '';

	defaultValue =
		type === 'multiple'
			? Array.isArray(defaultValue)
				? defaultValue
				: []
			: typeof defaultValue === 'string' || defaultValue === undefined
				? defaultValue
				: '';

	collapsible = type === 'single' ? (collapsible ?? false) : undefined;

	let rootValue = $state({ current: value });

	const rootProps = $derived({
		'class': cn('w-full', className),
		'data-orientation': orientation === 'horizontal' ? orientation : undefined,
		'data-disabled': disabled === true || undefined,
		...restProps,
	});

	useAccordionRoot({
		rootType: type,
		rootOrientation: orientation,
		rootDisabled: disabled,
		rootValue: rootValue,
		rootDefaultValue: defaultValue,
		rootCollapsible: collapsible,
		rootOnValueChange: onValueChange,
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
