import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { PickerItemProps } from "@react-native-picker/picker";
import { IReduxOptionsData } from "./redux";

/**
 * Sdilene vlastnosti napric kazdym polem
 */
export interface ICollectionFieldShared<F, V> {
	/**
	 * Nazev hodnoty
	 */
	name: F;

	/**
	 * Popisek
	 */
	label: string;

	/**
	 * Popis
	 */
	description: string;

	/**
	 * Ikona
	 */
	icon: IconDefinition;

	/**
	 * Validace hodnoty
	 *
	 * @param {V} value Hodnota
	 */
	validate?: (value: V) => string;

	/**
	 * Vychozi hodnota
	 *
	 * @param {IReduxOptionsData} options Nastaveni
	 */
	value?: (options: IReduxOptionsData) => V;
}

/**
 * Datum
 */
export interface ICollectionFieldDate<F> extends ICollectionFieldShared<F, Date> {
	/**
	 * Typ
	 */
	type: "date";
}

/**
 * Obrazky
 */
export interface ICollectionFieldImage<F> extends ICollectionFieldShared<F, string[]> {
	/**
	 * Typ
	 */
	type: "image";
}

/**
 * Viceradkovy text
 */
export interface ICollectionFieldMultiline<F> extends ICollectionFieldShared<F, string> {
	/**
	 * Typ
	 */
	type: "multiline";

	/**
	 * Pocet radku
	 */
	lines: number;
}

/**
 * Cislo
 */
export interface ICollectionFieldNumber<F> extends ICollectionFieldShared<F, number> {
	/**
	 * Typ
	 */
	type: "number";

	/**
	 * Jednotka
	 */
	unit?: string;
}

/**
 * Vyberove menu (jedna polozka)
 */
export interface ICollectionFieldPicker<F> extends ICollectionFieldShared<F, string> {
	/**
	 * Typ
	 */
	type: "picker";

	/**
	 * Polozky
	 *
	 * @param {IReduxOptionsData} options Nastaveni
	 */
	items: (options: IReduxOptionsData) => PickerItemProps[];
}

/**
 * Rozsah
 */
export interface ICollectionFieldRange<F> extends Omit<ICollectionFieldShared<F, [number, number]>, "label" | "icon"> {
	/**
	 * Typ
	 */
	type: "range";

	/**
	 * Popisek
	 */
	label: [string, string];

	/**
	 * Ikona
	 */
	icon: [IconDefinition, IconDefinition];
}

/**
 * Hodnoceni
 */

export interface ICollectionFieldRating<F> extends ICollectionFieldShared<F, number> {
	/**
	 * Typ
	 */
	type: "rating";
}

/**
 * Spinner
 */
export interface ICollectionFieldSpinner<F> extends ICollectionFieldShared<F, number> {
	/**
	 * Typ
	 */
	type: "spinner";

	/**
	 * Maximalni hodnota
	 */
	max: number;

	/**
	 * Minimalni hodnota
	 */
	min: number;

	/**
	 * Krok
	 */
	step: number;
}

/**
 * Tagy (vice hodnot)
 */
export interface ICollectionFieldTags<F> extends ICollectionFieldShared<F, string[]> {
	/**
	 * Typ
	 */
	type: "tags";

	/**
	 * Polozky
	 *
	 * @param {IReduxOptionsData} options Nastaveni
	 */
	items: (options: IReduxOptionsData) => string[];

	/**
	 * Popisky hodnot
	 *
	 * @param {IReduxOptionsData} options Nastaveni
	 */
	labels?: (options: IReduxOptionsData) => Record<string, string>;
}

/**
 * Text
 */
export interface ICollectionFieldText<F> extends ICollectionFieldShared<F, string> {
	/**
	 * Typ
	 */
	type: "text";
}

/**
 * Skryte pole
 */
export interface ICollectionFieldHidden<F> extends Omit<ICollectionFieldShared<F, string>, "icon" | "label" | "validate"> {
	/**
	 * Typ
	 */
	type: "hidden";
}

/**
 * Pole kolekce
 */
export type ICollectionField<F> =
	| ICollectionFieldDate<F>
	| ICollectionFieldImage<F>
	| ICollectionFieldMultiline<F>
	| ICollectionFieldNumber<F>
	| ICollectionFieldPicker<F>
	| ICollectionFieldRange<F>
	| ICollectionFieldRating<F>
	| ICollectionFieldSpinner<F>
	| ICollectionFieldText<F>
	| ICollectionFieldTags<F>
	| ICollectionFieldHidden<F>;

/**
 * Kolekce
 */
export interface ICollection<F> {
	/**
	 * Popisek
	 */
	title?: string;

	/**
	 * Pole
	 */
	fields: Array<ICollectionField<F>>;

	actions?: any;

	menu?: any;
}
