import { IDataCollection } from "../../types/data";
import { IReduxAction } from "../../types/redux";
import store from "../store";

/**
 * Nacteni kompletni kolekce zaznamu do kolekce
 *
 * @param {IDataCollection[]} records Zaznamy
 * @returns {IReduxAction} Akce
 */
export function loadRecords(records: IDataCollection[]): IReduxAction {
	const options = store.getState().options.values;
	return {
		payload: {
			options,
			records
		},
		type: "collection-load"
	};
}

/**
 * Pridani zaznamu do kolekce
 *
 * @param {IDataCollection} record Zaznam
 * @returns {IReduxAction} Akce
 */
export function pushRecord(record: IDataCollection): IReduxAction {
	const options = store.getState().options.values;
	return {
		payload: {
			options,
			record
		},
		type: "collection-push"
	};
}

/**
 * Aktualizace zaznamu v kolekci
 *
 * @param {string} id ID zaznamu
 * @param {Partial<IDataCollection>} record Zaznam
 * @returns {IReduxAction} Akce
 */
export function updateRecord(id: string, record: Partial<IDataCollection>): IReduxAction {
	const options = store.getState().options.values;
	return {
		payload: {
			id,
			options,
			record
		},
		type: "collection-update"
	};
}

/**
 * Odstraneni zaznamu z kolekce
 *
 * @param {string} id Identifikator
 * @returns {IReduxAction} Akce
 */
export function removeRecord(id: string): IReduxAction {
	const options = store.getState().options.values;
	return {
		payload: {
			id,
			options
		},
		type: "collection-remove"
	};
}
