import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { PickerItemProps } from "@react-native-picker/picker";
import { IReduxOptionsData, IReduxRecordsData } from "./redux";

/**
 * Sdilene vlastnosti napric kazdym polem
 */
export interface ICollectionFieldShared<R, V> {
	/**
	 * Nazev hodnoty
	 */
	name: keyof R;

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
	 */
	value?: V;
}

/**
 * Datum
 */
export interface ICollectionFieldDate<R> extends ICollectionFieldShared<R, Date> {
	/**
	 * Typ
	 */
	type: "date";
}

/**
 * Obrazky
 */
export interface ICollectionFieldImage<R> extends ICollectionFieldShared<R, string[]> {
	/**
	 * Typ
	 */
	type: "image";
}

/**
 * Viceradkovy text
 */
export interface ICollectionFieldMultiline<R> extends ICollectionFieldShared<R, string> {
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
export interface ICollectionFieldNumber<R> extends ICollectionFieldShared<R, number> {
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
export interface ICollectionFieldPicker<R, O> extends ICollectionFieldShared<R, string> {
	/**
	 * Typ
	 */
	type: "picker";

	/**
	 * Polozky
	 *
	 * @param {IReduxOptionsData<O>} options Nastaveni
	 * @param {IReduxRecordsData<R>} records Zaznamy
	 */
	items: O extends null ? null : (options: IReduxOptionsData<O>, records: IReduxRecordsData<R>) => PickerItemProps[];
}

/**
 * Rozsah
 */
export interface ICollectionFieldRange<R> extends Omit<ICollectionFieldShared<R, [number, number]>, "label" | "icon"> {
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

export interface ICollectionFieldRating<R> extends ICollectionFieldShared<R, number> {
	/**
	 * Typ
	 */
	type: "rating";
}

/**
 * Spinner
 */
export interface ICollectionFieldSpinner<R> extends ICollectionFieldShared<R, number> {
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
export interface ICollectionFieldTags<R, O> extends ICollectionFieldShared<R, string[]> {
	/**
	 * Typ
	 */
	type: "tags";

	/**
	 * Polozky
	 *
	 * @param {IReduxOptionsData<O>} options Nastaveni
	 * @param {IReduxRecordsData<R>} records Zaznamy
	 */
	items: O extends null ? null : (options: IReduxOptionsData<O>, records: IReduxRecordsData<R>) => string[];

	/**
	 * Popisky hodnot
	 *
	 * @param {IReduxOptionsData<O>} options Nastaveni
	 * @param {IReduxRecordsData<R>} records Zaznamy
	 */
	labels?: O extends null ? null : (options: IReduxOptionsData<O>, records: IReduxRecordsData<R>) => Record<string, string>;
}

/**
 * Text
 */
export interface ICollectionFieldText<R, O> extends ICollectionFieldShared<R, string> {
	/**
	 * Typ
	 */
	type: "text";

	/**
	 * Preddefinovane polozky
	 *
	 * @param {IReduxOptionsData<O>} options Nastaveni
	 * @param {IReduxRecordsData<R>} records Zaznamy
	 */
	predefined: O extends null ? null : (options: IReduxOptionsData<O>, records: IReduxRecordsData<R>) => string[];
}

/**
 * Skryte pole
 */
export interface ICollectionFieldHidden<R> extends Omit<ICollectionFieldShared<R, string | number>, "icon" | "label" | "validate"> {
	/**
	 * Typ
	 */
	type: "hidden";
}

/**
 * Pole kolekce
 */
export type ICollectionField<R, O> =
	| ICollectionFieldDate<R>
	| ICollectionFieldImage<R>
	| ICollectionFieldMultiline<R>
	| ICollectionFieldNumber<R>
	| ICollectionFieldPicker<R, O>
	| ICollectionFieldRange<R>
	| ICollectionFieldRating<R>
	| ICollectionFieldSpinner<R>
	| ICollectionFieldText<R, O>
	| ICollectionFieldTags<R, O>
	| ICollectionFieldHidden<R>;

/**
 * Hlavni zatnamy
 */
export interface ICollectionRecord<R, O> {
	/**
	 * Pole
	 */
	fields: Array<ICollectionField<R, O>>;

	actions?: any;

	menu?: any;
}

/**
 * Nastaveni
 */
export interface ICollectionOptions<O> {
	/**
	 * Pole
	 */
	fields: Array<ICollectionField<O, null>>;

	actions?: any;
}

/**
 * Kolekce
 */
export interface ICollection<R, O> {
	/**
	 * Popisek
	 */
	title: string;

	/**
	 * Zaznamy
	 */
	records: ICollectionRecord<R, O>;

	/**
	 * Nastaveni
	 */
	options: ICollectionOptions<O>;
}
