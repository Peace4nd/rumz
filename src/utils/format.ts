import { ItemValue, PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import moment, { MomentInput } from "moment";
import strings from "./strings";

/**
 * Datum
 *
 * @param {MomentInput} value Hodnota
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function date(value: MomentInput, textual: boolean = true): string {
	if (value) {
		return moment(value).format("DD. MM. YYYY");
	}
	return textual ? strings("overviewUndefined") : null;
}

/**
 * Pole
 *
 * @param {string[]} value Hodnota
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function array(value: string[], textual: boolean = true): string {
	if (Array.isArray(value)) {
		return value.join(", ");
	}
	return textual ? strings("overviewUndefined") : null;
}

/**
 * Cislo
 *
 * @param {number} value Hodnota
 * @param {string} unit Jednotka
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function number(value: number, unit?: string, textual: boolean = true): string {
	if (isNaN(value)) {
		return textual ? strings("overviewUndefined") : null;
	}
	return value.toFixed(0) + (unit || "");
}

/**
 * Retezec
 *
 * @param {string} value Hodnota
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function string(value: string, textual: boolean = true): string {
	if (!value) {
		return textual ? strings("overviewUndefined") : null;
	}
	return value;
}

/**
 * Rozsah
 *
 * @param {number[]} value Hodnota
 * @param {string} unit Jednotka
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function range(value: number[], unit?: string, textual: boolean = true): string {
	if (Array.isArray(value) && (value[0] > 0 || value[1] > 0)) {
		if (value[0] && value[1]) {
			return value[0].toFixed(0) + " - " + value[1].toFixed(0) + (unit || "");
		} else {
			if (value[0]) {
				return ">" + value[0].toFixed(0) + (unit || "");
			} else {
				return "<" + value[1].toFixed(0) + (unit || "");
			}
		}
	}
	return textual ? strings("overviewUndefined") : null;
}

/**
 * Polozka
 *
 * @param {ItemValue} value Hodnota
 * @param {PickerItemProps[]} items Polozky
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function item(value: ItemValue, items: PickerItemProps[], textual: boolean = true): string {
	if (value) {
		const found = items.find((rec) => rec.value === value);
		if (found) {
			return found.label;
		}
	}
	return textual ? strings("overviewUndefined") : null;
}

/**
 * Hodnoceni
 *
 * @param {number} value Hodnota
 * @param {boolean} textual Textovy vystup
 * @returns {string} Formatovana hodnota
 */
export function rating(value: number, textual: boolean = true): string {
	if (isNaN(value)) {
		return textual ? strings("overviewUndefined") : null;
	}
	return value.toFixed(0) + "/10";
}

/**
 * Export
 */
export default {
	array,
	date,
	item,
	number,
	range,
	rating,
	string
};
