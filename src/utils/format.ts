import { ItemValue, PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import moment, { MomentInput } from "moment";
import strings from "./strings";

/**
 * Datum
 *
 * @param {MomentInput} value Hodnota
 * @returns {string} Formatovana hodnota
 */
export function date(value: MomentInput): string {
	if (value) {
		return moment(value).format("DD. MM. YYYY");
	}
	return strings("overviewUndefined");
}

/**
 * Pole
 *
 * @param {string[]} value Hodnota
 * @returns {string} Formatovana hodnota
 */
export function array(value: string[]): string {
	if (Array.isArray(value)) {
		return value.join(", ");
	}
	return strings("overviewUndefined");
}

/**
 * Cislo
 *
 * @param {number} value Hodnota
 * @param {string} unit Jednotka
 * @returns {string} Formatovana hodnota
 */
export function number(value: number, unit?: string): string {
	if (isNaN(value)) {
		return strings("overviewUndefined");
	}
	return value.toFixed(0) + (unit || "");
}

/**
 * Retezec
 *
 * @param {string} value Hodnota
 * @returns {string} Formatovana hodnota
 */
export function string(value: string): string {
	if (!value) {
		return strings("overviewUndefined");
	}
	return value;
}

/**
 * Rozsah
 *
 * @param {number[]} value Hodnota
 * @param {string} unit Jednotka
 * @returns {string} Formatovana hodnota
 */
export function range(value: number[], unit?: string): string {
	if (Array.isArray(value) && (value[0] > 0 || value[1] > 0)) {
		if (value[0] && value[1]) {
			return value[0].toFixed(0) + " - " + value[1].toFixed(0) + (unit || "");
		} else {
			if (value[0]) {
				return value[0].toFixed(0) + (unit || "");
			} else {
				return value[1].toFixed(0) + (unit || "");
			}
		}
	}
	return strings("overviewUndefined");
}

/**
 * Polozka
 *
 * @param {ItemValue} value Hodnota
 * @param {PickerItemProps[]} items Polozky
 * @returns {string} Formatovana hodnota
 */
export function item(value: ItemValue, items: PickerItemProps[]): string {
	if (value) {
		const found = items.find((rec) => rec.value === value);
		if (found) {
			return found.label;
		}
	}
	return strings("overviewUndefined");
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
	string
};
