import { IDataOptions } from "../../types/data";
import { IReduxAction } from "../../types/redux";

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
 * @returns {IReduxAction} Akce
 */
export function updateOptions(values: Partial<IDataOptions>): IReduxAction {
	return {
		payload: values,
		type: "options-update"
	};
}
