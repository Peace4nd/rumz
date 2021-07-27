/**
 * Datovy typ zaznamu kolekce
 */
export interface ICollectionRecord {
	/**
	 * Identifikator
	 */
	id: string;

	/**
	 * Nazev
	 */
	name: string;

	/**
	 * Doplnujici nazev
	 */
	subname: string;

	/**
	 * Datum zakoupeni
	 */
	purchased: string;

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
	 * Zrani v sudu
	 */
	cask: string[];

	/**
	 * Barva (zlata, hneda, tmava zlata, ...)
	 */
	color: string[];

	/**
	 * Cichove vlastnosti (tony kavy, vanilky, ...)
	 */
	aroma: string[];

	/**
	 * Chutove vlastnosti (pomerance, vanilka, ...)
	 */
	taste: string[];

	/**
	 * Vypite mnozsti
	 */
	drunk: number;

	/**
	 * Pocet lahvi
	 */
	bottle: number;
}

/**
 * Datovy typ nastaveni
 */
export interface ICollectionOptions {
	/**
	 * Objen jednoho panaku
	 */
	dram: number;

	/**
	 * Senzoricke vlastnosti
	 */
	properties: {
		/**
		 * Barva
		 */
		color: string[];

		/**
		 * Cichove vlastnosti
		 */
		aroma: string[];

		/**
		 * Chutove vlastnosti
		 */
		taste: string[];
	};

	/**
	 * Typ sudu
	 */
	cask: string[];

	/**
	 * Mandatorni polozky kolekce
	 */
	mandatory: string[];
}
