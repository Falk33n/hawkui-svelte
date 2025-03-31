export type ButtonMouseEvent = MouseEvent & {
	currentTarget: EventTarget & HTMLButtonElement;
};
