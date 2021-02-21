/**
 * Typ uloziste
 */
export type IStorageKey = "collection" | "options";

/**
 * Definice metod pro objekt
 */
export interface IStorageSection<T> {
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
	 * @returns {Promise<void>} Prazdna odpoved
	 */
	write: (data: T) => Promise<void>;
}
