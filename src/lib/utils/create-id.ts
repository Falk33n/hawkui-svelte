// @ts-expect-error globalThis has implicty type any.
globalThis.hawkIdCounter ??= { current: 0 };

/** Generates a unique ID based on a global counter. */
export function createId(prefix = 'hawk') {
	// @ts-expect-error globalThis has implicty type any.
	globalThis.hawkIdCounter.current++;
	// @ts-expect-error globalThis has implicty type any.
	return `${prefix}-${globalThis.hawkIdCounter.current}`;
}
