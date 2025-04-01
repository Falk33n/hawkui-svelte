/**
 * Used in context for reactive values, makes the prop be an object (proxy)
 * to make it reactive inside the context.
 */
export type Reactive<T> = { current: T };

/**
 * Used in context for reactive values, modifies the prop to be an object (proxy)
 * to make it reactive inside the context. Whilst keeping original metadata like jsDoc.
 */
export type AsReactive<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: Required<{ current: T[P] }>;
};
