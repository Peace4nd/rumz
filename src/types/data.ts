import { IFileDocument } from "./file";

/**
 * Datovy typ zaznamu kolekce
 */
export interface IDataCollection {
	/**
	 * Identifikator
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
 * Datovy typ nastaveni
 */
export interface IDataOptions {
	/**
	 * Objen jednoho panaku
	 */
	dram: number;

	/**
	 * Senzoricke vlastnosti
	 */
	properties: string[];
}
