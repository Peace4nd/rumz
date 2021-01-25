import { DocumentPickerResponse } from "react-native-document-picker";
import FetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
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
	// nalezeni prislusne cesty
	const stat = await FetchBlob.fs.stat(source);
	// nakopirovani
	await fs.copyFile(stat.path, dest);
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
	 * @param {DocumentPickerResponse} document Vybrany dokument
	 * @param {string} id Identifikator zaznamu
	 * @returns {Promise<string>} Cesta k pridanemu souboru
	 */
	add: (document: DocumentPickerResponse, id: string): Promise<string> => {
		const ext = document.name.split(".").pop();
		return copyAssets("collection", decodeURIComponent(document.fileCopyUri), id + "." + ext);
	}
};

// vychozi export
export default {
	collection
};
