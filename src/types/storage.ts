import { IReduxCollection, IReduxOptions } from "./redux";

/**
 * Sekce uloziste
 */
export interface IStorageSections {
	collection: IReduxCollection;
	options: IReduxOptions;
}

/**
 * Typ uloziste
 */
export type IStorageKey = keyof IStorageSections;

/**
 * Definice metod pro objekt
 */
export interface IStorageActions<T> {
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
