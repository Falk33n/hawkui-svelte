<script
	lang="ts"
	module
>
	import type { WithChild, WithElementRef } from '$lib/types';
	import type { HTMLAttributes } from 'svelte/elements';

	type AccordionRootBaseAttributes = WithElementRef<
		WithChild<HTMLAttributes<HTMLDivElement>>,
		HTMLDivElement
	>;

	type AccordionRootBaseProps = {
		/**
		 * Whether or not the accordion is disabled. When disabled, the accordion cannot be interacted with.
		 * @defaultValue `false`
		 */
		disabled?: boolean;
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
		 * If `type` is `"multiple"`, this should be an array of strings.
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
		 * If `type` is `"single"`, the argument will be a string.
		 *
		 * If `type` is `"multiple"`, the argument will be an array of strings.
		 */
		onValueChange?: (value: string) => void;

		/**
		 * When `type` is `"single"`, allows closing content when clicking the trigger for an open item.
		 * @defaultValue `true`
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
		 * If `type` is `"multiple"`, this should be an array of strings.
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
		 * If `type` is `"single"`, the argument will be a string.
		 *
		 * If `type` is `"multiple"`, the argument will be an array of strings.
		 */
		onValueChange?: (value: string[]) => void;

		/**
		 * When `type` is `"single"`, allows closing content when clicking the trigger for an open item.
		 * @defaultValue `true`
		 */
		collapsible?: never;
	};

	export type AccordionRootProps = AccordionRootBaseAttributes &
		(AccordionRootTypeSingle | AccordionRootTypeMultiple);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { useAccordionRoot, type AccordionRootContextInput } from './context.svelte';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		children,
		child,
		onValueChange,
		class: className,
		type,
		collapsible,
		disabled = false,
		defaultValue = '',
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

	collapsible = type === 'single' ? (collapsible ?? true) : undefined;

	const rootProps = $derived<HTMLAttributes<HTMLDivElement>>({
		'class': cn(
			'group w-full border-t transition-opacity duration-200',
			'data-[disabled-root=true]:pointer-events-none data-[disabled-root=true]:opacity-70',
			className,
		),
		'data-disabled-root': disabled || undefined,
		...restProps,
	});

	// We cast the type since TypeScript can't compute the change of values
	// we have done in realtime.
	useAccordionRoot({
		isCollapsible: collapsible,
		isRootDisabled: disabled,
		rootType: type,
		rootValue: value,
		rootDefaultValue: defaultValue,
		rootOnValueChange: onValueChange,
	} as AccordionRootContextInput);
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
