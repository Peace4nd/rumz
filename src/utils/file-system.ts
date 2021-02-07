import mime from "mime";
import fs from "react-native-fs";
import { IFileDocument } from "../types/file";
import { IStorageKey } from "../types/storage";

/**
 * Pridani noveho souboru do uloziste
 *
 * @param {IStorageKey} key Klic
 * @param {string} source Zdrojovy soubor
 * @param {string} file Nazev souboru
 * @returns {Promise<string>} Cesta k pridanemu souboru
 */
async function copyAssets(key: IStorageKey, source: string, file: string): Promise<string> {
	// definice
	const dest = fs.DocumentDirectoryPath + "/" + key + "/" + file;
	// overeni existence adresare
	const exists = await fs.exists(fs.DocumentDirectoryPath + "/" + key);
	if (!exists) {
		await fs.mkdir(fs.DocumentDirectoryPath + "/" + key);
	}
	// nakopirovani
	await fs.copyFile(source, dest);
	// vraceni cesty
	return "file://" + dest;
}

/**
 * Kolekce
 */
export const collection = {
	/**
	 * Pridani obrazku do kolekce
	 *
	 * @param {IFileDocument} document Vybrany dokument
	 * @param {string} id Identifikator zaznamu
	 * @returns {Promise<string>} Cesta k pridanemu souboru
	 */
	add: (document: IFileDocument, id: string): Promise<string> => {
		return copyAssets("collection", document.path, id + "." + mime.getExtension(document.mime));
	}
};

// vychozi export
export default {
	collection
};
