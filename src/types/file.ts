/**
 * Dokument souboroveho systemu
 */
export interface IFileDocument {
	/**
	 * MIME typ
	 */
	mime?: string;

	/**
	 * Nazev
	 */
	filename?: string;

	/**
	 * Plna cesta
	 */
	path?: string;

	/**
	 * Velikost
	 */
	size?: number;

	/**
	 * Posledni modifikace
	 */
	lastModified?: Date;
}
