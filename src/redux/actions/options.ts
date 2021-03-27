import { IDataOptions } from "../../types/data";
import { IReduxAction } from "../../types/redux";
import { IMergeArray } from "../../utils/merge";

/**
 * Nacteni nastaveni
 *
 * @param {Partial<IDataOptions>} values Hodnoty
 * @returns {IReduxAction} Akce
 */
export function loadOptions(values: IDataOptions): IReduxAction {
	return {
		payload: values,
		type: "options-load"
	};
}

/**
 * Aktualizace nastaveni
 *
 * @param {Partial<IDataOptions>} values Hodnoty
 * @param {IMergeArray} array Zpracovani pole
 * @returns {IReduxAction} Akce
 */
export function updateOptions(values: Partial<IDataOptions>, array: IMergeArray = "append"): IReduxAction {
	return {
		payload: {
			array,
			values
		},
		type: "options-update"
	};
}
