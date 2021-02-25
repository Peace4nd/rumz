import fs from "react-native-fs";

/**
 * Overeni existence adresare pro assety
 */
async function checkAssetsPath(): Promise<void> {
	const exists = await fs.exists(fs.DocumentDirectoryPath);
	if (!exists) {
		await fs.mkdir(fs.DocumentDirectoryPath);
	}
}

// vychozi export
export default {
	/**
	 * Ulozeni souboru
	 *
	 * @param {string} source Zdrojovy soubor
	 * @param {string} file Nazev ciloveho souboru
	 * @returns {Promise<string>} Cesta k pridanemu souboru
	 */
	copy: async (source: string, file: string): Promise<string> => {
		// definice
		const dest = fs.DocumentDirectoryPath + "/" + file;
		// overeni existence adresare
		await checkAssetsPath();
		// nakopirovani
		await fs.copyFile(source, dest);
		// vraceni cesty
		return dest;
	},

	/**
	 * Nacteni souboru
	 *
	 * @param {string} file Soubor
	 * @returns {Promise<string>} Obsah souboru
	 */
	read: async (file: string): Promise<string> => {
		// nacteni souboru
		const content = await fs.readFile(file, "base64");
		// vraceni seznamu souboru
		return content;
	},

	/**
	 * Ulozeni souboru
	 *
	 * @param {string} file Soubor
	 * @param {string} content Obsah
	 */
	save: async (file: string, content: string): Promise<void> => {
		// overeni existence adresare
		await checkAssetsPath();
		// zapis
		await fs.writeFile(file, content, "base64");
	}
};
