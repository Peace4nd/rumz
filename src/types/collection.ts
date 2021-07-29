import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { PickerItemProps } from "@react-native-picker/picker";

export interface ICollectionFieldShared<D> {
	/**
	 * Nazev hodnoty
	 */
	name: keyof D;

	/**
	 * Popisek
	 */
	label: string;

	/**
	 * Ikona
	 */
	icon: IconDefinition;

	/**
	 * Validator
	 */
	validator?: (value: any) => string;

	/**
	 * Vytvoreni nove vychozi hodnoty
	 */
	defaults?: () => any;
}

export interface ICollectionFieldDate<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "date";
}

export interface ICollectionFieldImage<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "image";
}

export interface ICollectionFieldMultiline<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "multiline";

	/**
	 * Pocet radku
	 */
	lines: number;
}

export interface ICollectionFieldNumber<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "number";

	/**
	 * Jednotka
	 */
	unit?: string;
}

export interface ICollectionFieldPicker<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "picker";

	/**
	 * Polozky
	 */
	items: PickerItemProps[];
}

export interface ICollectionFieldRange<D> extends Omit<ICollectionFieldShared<D>, "label" | "icon"> {
	/**
	 * Typ
	 */
	type: "range";

	label: [string, string];
	icon: [IconDefinition, IconDefinition];
}

export interface ICollectionFieldRating<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "rating";
}

export interface ICollectionFieldSpinner<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "spinner";
	max: number;
	min: number;
	step: number;
}

export interface ICollectionFieldTags<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "tags";

	/**
	 * Polozky
	 */
	items: string[];

	/**
	 * Popisky hodnot
	 */
	labels?: Record<string, string>;
}

export interface ICollectionFieldText<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "text";
}

export interface ICollectionFieldHidden<D> extends ICollectionFieldShared<D> {
	/**
	 * Typ
	 */
	type: "hidden";
}

export type ICollectionField<D> =
	| ICollectionFieldDate<D>
	| ICollectionFieldImage<D>
	| ICollectionFieldMultiline<D>
	| ICollectionFieldNumber<D>
	| ICollectionFieldPicker<D>
	| ICollectionFieldRange<D>
	| ICollectionFieldRating<D>
	| ICollectionFieldSpinner<D>
	| ICollectionFieldText<D>
	| ICollectionFieldTags<D>
	| ICollectionFieldHidden<D>;

export interface ICollection<T> {
	title: string;
	actions: any;
	fields: Array<ICollectionField<T>>;
}
