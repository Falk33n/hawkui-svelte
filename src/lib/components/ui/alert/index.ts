import Description, { type AlertDescriptionProps } from './alert-description.svelte';
import Title, { type AlertTitleProps } from './alert-title.svelte';
import Root, { type AlertRootProps, type AlertVariant, alertVariants } from './alert.svelte';

export {
	Root as Alert,
	Description as AlertDescription,
	Title as AlertTitle,
	alertVariants,
	Description,
	Root,
	Title,
	type AlertDescriptionProps,
	type AlertRootProps,
	type AlertTitleProps,
	type AlertVariant,
	type AlertDescriptionProps as DescriptionProps,
	type AlertRootProps as RootProps,
	type AlertTitleProps as TitleProps,
};
