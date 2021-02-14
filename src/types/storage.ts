/**
 * Typ uloziste
 */
export type IStorageKey = "collection" | "options";

/**
 * Zakladni struktura zaznamu
 */
export interface IStorageRecord {
	/**
	 * Unikatni identifikator
	 */
	id: string;
}

/**
 * Definice metod pro pole
 */
export interface IStorageCollectionArray<R extends IStorageRecord, I> {
	/**
	 * Nalezeni zaznamu v kolekci
	 *
	 * @param {I} id ID
	 * @returns {Promise<R>} Zaznam z kolekce
	 */
	find: (id: I) => Promise<R>;

	/**
	 * Pridani zaznamu do kolekce
	 *
	 * @param {R} record Zaznam
	 * @returns {Promise<R[]>} Kompletni kolekce
	 */
	push: (record: R) => Promise<R[]>;

	/**
	 * Nacteni cele kolekce
	 *
	 * @returns {Promise<R[]>} Kompletni kolekce
	 */
	read: () => Promise<R[]>;

	/**
	 * Odstraneni zaznamu z kolekce
	 *
	 * @param {I} id ID
	 * @returns {Promise<R[]>} Kompletni kolekce
	 */
	remove: (id: I) => Promise<R[]>;

	/**
	 * Aktualizace zaznamu v kolekci
	 *
	 * @param {I} id ID
	 * @param {Partial<R>} record Zaznam
	 * @returns {Promise<R[]>} Kompletni kolekce
	 */
	update: (id: I, record: Partial<R>) => Promise<R[]>;
}

/**
 * Definice metod pro objekt
 */
export interface IStorageCollectionObject<R> {
	/**
	 * Nacteni cele kolekce
	 *
	 * @returns {Promise<R>} Kompletni kolekce
	 */
	read: () => Promise<R>;

	/**
	 * Aktualizace zaznamu v kolekci
	 *
	 * @param {Partial<R>} record Zaznam
	 * @returns {Promise<R>} Kompletni kolekce
	 */
	update: (record: Partial<R>) => Promise<R>;
}
