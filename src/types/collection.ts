/**
 * Datovy typ zaznamu kolekce
 */
export interface ICollectionRecord {
	/**
	 * Unikatni identifikator
	 */
	id: string;

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
	image: string;

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
	 * Hodnoceni (0 - 5)
	 */
	rating: 0 | 1 | 2 | 3 | 4 | 5;

	/**
	 * Delka zrani
	 */
	ripening: number;

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
}
