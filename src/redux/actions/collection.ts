import { IDataCollection } from "../../types/data";
import { IReduxAction } from "../../types/redux";
import { IUtilityRecursivePartial } from "../../types/utility";

/**
 * Nacteni kompletni kolekce zaznamu do kolekce
 *
 * @param {IDataCollection[]} records Zaznamy
 * @returns {IReduxAction} Akce
 */
export function loadRecords(records: IDataCollection[]): IReduxAction {
	return {
		payload: records,
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
	return {
		payload: record,
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
export function updateRecord(id: string, record: IUtilityRecursivePartial<IDataCollection>): IReduxAction {
	return {
		payload: {
			id,
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
	return {
		payload: id,
		type: "collection-remove"
	};
}
