/**
 * Used in context for reactive values, makes the state be an object (proxy)
 * to make it reactive inside the context.
 */
export type Reactive<T> = { current: T };
