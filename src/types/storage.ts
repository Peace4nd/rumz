import { IReduxOptionsData, IReduxRecordsData } from "./redux";

/**
 * Sekce uloziste
 */
export interface IStorageSections {
	records: IReduxRecordsData;
	options: IReduxOptionsData;
}

/**
 * Typ uloziste
 */
export type IStorageKey = keyof IStorageSections | "collections";

/**
 * Definice metod pro objekt
 */
export interface IStorageBasic<T> {
	/**
	 * Nacteni cele kolekce
	 *
	 * @returns {Promise<T>} Kompletni kolekce
	 */
	read: () => Promise<T>;

	/**
	 * Aktualizace zaznamu v kolekci
	 *
	 * @param {T} data Data
	 */
	write: (data: T) => Promise<void>;
}

/**
 * Definice metod pro objekt
 */
export interface IStorageNamespace<T> {
	/**
	 * Nacteni cele kolekce
	 *
	 * @param {string} guid ID kolekce
	 * @returns {Promise<T>} Kompletni kolekce
	 */
	read: (guid: string) => Promise<T>;

	/**
	 * Aktualizace zaznamu v kolekci
	 *
	 * @param {string} guid ID kolekce
	 * @param {T} data Data
	 */
	write: (guid: string, data: T) => Promise<void>;
}
