import { IDataOptions } from "../../types/data";
import { IReduxAction } from "../../types/redux";
import { IUtilityRecursivePartial } from "../../types/utility";

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
export function updateOptions(values: IUtilityRecursivePartial<IDataOptions>): IReduxAction {
	return {
		payload: values,
		type: "options-update"
	};
}
