export type IUtilityRecursivePartial<T> = {
	[P in keyof T]?: IUtilityRecursivePartial<T[P]>;
};
