import { IFileDocument } from "./file";

/**
 * Typ uloziste
 */
export type IStorageKey = "collection" | "options" | "meta";

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
export interface IStorageArray<R extends IStorageRecord, I> {
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
export interface IStorageObject<R> {
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

/**
 * Datovy typ zaznamu kolekce
 */
export interface IStorageCollection extends IStorageRecord {
	/**
	 * Nazev
	 */
	name: string;

	/**
	 * Datum zakoupeni
	 */
	purchased: Date;

	/**
	 * Obrazky
	 */
	image: IFileDocument;

	/**
	 * Zeme puvodu (ISO kod zeme)
	 */
	origin: string;

	/**
	 * Vyrobce
	 */
	manufacturer: string;

	/**
	 * Objem alkoholu (v %)
	 */
	alcohol: number;

	/**
	 * Cena (v Kc)
	 */
	price: number;

	/**
	 * Objem lahve (v ml)
	 */
	volume: number;

	/**
	 * Poznamky
	 */
	notes: string;

	/**
	 * Hodnoceni (0 - 10)
	 */
	rating: number;

	/**
	 * Delka zrani
	 */
	ripening: [
		/**
		 * Nejnizsi delka zrani
		 */
		lowest: number,

		/**
		 * Nejvyssi delka zrani
		 */
		highest: number
	];

	/**
	 * Barva (zlata, hneda, tmava zlata, ...)
	 */
	color: string;

	/**
	 * Cichove vlastnosti (tony kavy, vanilky, ...)
	 */
	smell: string;

	/**
	 * Chutove vlastnosti (pomerance, vanilka, ...)
	 */
	taste: string;

	/**
	 * Pocet vypitych panaku (a 40ml)
	 */
	drunk: number;
}

/**
 * Datovy typ pro metadata
 */
export interface IStorageMeta {
	/**
	 * Posledni aktualizace
	 */
	updated: number;
}

/**
 * Datovy typ nastaveni
 */
export interface IStorageOptions {
	/**
	 * Objen jednoho panaku
	 */
	dram: number;

	/**
	 * Senzoricke vlastnosti
	 */
	properties: string[];
}
