import type { Snippet } from 'svelte';

export type WithElementRef<Props, Ref extends HTMLElement = HTMLElement> = Props & {
	/**
	 * The underlying DOM element being rendered. You can bind to this to get a
	 * reference to the element.
	 */
	ref?: Ref | null;
};

export type WithoutElementRef<Props> = Omit<Props, 'ref'>;

export type WithChildren<Props> = Props & { children?: Snippet };
export type WithoutChildren<Props> = Omit<Props, 'children'>;

export type WithChild<Props> = Props & {
	/**
	 * Use render delegation to render your own element.
	 *
	 * - The component passes all internal props and your custom props
	 *   passed to the component via the props snippet parameter.
	 * - You decide which element receives these props.
	 * - The component's internal logic continues to work correctly.
	 */
	child?: Snippet<[{ props?: Record<string, unknown> }]>;
};

export type WithoutChild<Props> = Omit<Props, 'child'>;

export type WithChildrenAndChild<
	Props,
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	ChildProps extends Record<string, unknown> = {},
> = WithChildren<Props & WithChild<ChildProps>>;

export type WithoutChildrenAndChild<Props> = Omit<Props, 'children' | 'child'>;

export type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
