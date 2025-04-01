import type { AsReactive, PickAndRequire, Reactive } from '$lib/types';
import { getContext, hasContext, setContext } from 'svelte';
import type { AvatarRootProps } from './avatar.svelte';

const AVATAR_ROOT_CONTEXT_KEY = Symbol('hawk-avatar-root-key');

//
// TYPES FOR ROOT CONTEXT
//

export type AvatarLoadingStatus = 'loading' | 'error' | 'loaded';

type AvatarRootContextInput = PickAndRequire<AvatarRootProps, 'loadingStatus' | 'delayMs'> &
	Pick<AvatarRootProps, 'onLoadingStatusChange'>;

type AvatarRootContextOutput = AsReactive<AvatarRootContextInput, 'loadingStatus'>;

//
// GETTER FUNCTIONS FOR CONTEXT
//

export function useAvatarRoot(props: AvatarRootContextInput) {
	const { loadingStatus: initialLoadingStatus, ...restProps } = props;

	const loadingStatus = $state<Reactive<AvatarLoadingStatus>>({ current: initialLoadingStatus });

	return setContext<AvatarRootContextOutput>(AVATAR_ROOT_CONTEXT_KEY, {
		loadingStatus,
		...restProps,
	});
}

export function useAvatarImage() {
	if (!hasContext(AVATAR_ROOT_CONTEXT_KEY)) {
		throw new Error(
			'Context not found: This component is not an child of the Avatar.Root component.',
		);
	}

	return getContext<AvatarRootContextOutput>(AVATAR_ROOT_CONTEXT_KEY);
}

export { useAvatarImage as useAvatarFallback };
