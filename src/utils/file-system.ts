import mime from "mime";
import fs from "react-native-fs";
import { IFileDocument } from "../types/file";

// vychozi export
export default {
	/**
	 * Ulozeni souboru
	 *
	 * @param {IFileDocument} document Vybrany dokument
	 * @param {string} id Identifikator zaznamu
	 * @returns {Promise<string>} Cesta k pridanemu souboru
	 */
	copy: async (document: IFileDocument, id: string): Promise<string> => {
		// definice
		const file = id + "." + mime.getExtension(document.mime);
		const dest = fs.DocumentDirectoryPath + "/" + file;
		// overeni existence adresare
		const exists = await fs.exists(fs.DocumentDirectoryPath);
		if (!exists) {
			await fs.mkdir(fs.DocumentDirectoryPath);
		}
		// nakopirovani
		await fs.copyFile(document.path, dest);
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

	save: async (file: string, content: string): Promise<void> => {
		/*
		// definice
		const file = id + "." + mime.getExtension(document.mime);
		const dest = fs.DocumentDirectoryPath + "/" + file;
		// overeni existence adresare
		const exists = await fs.exists(fs.DocumentDirectoryPath);
		if (!exists) {
			await fs.mkdir(fs.DocumentDirectoryPath);
		}
		// nakopirovani
		await fs.writeFile(document.path, content);
		*/
	}
};
