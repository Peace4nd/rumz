import AsyncStorage from "@react-native-async-storage/async-storage";
import { IReduxCollections, IReduxOptionsData, IReduxRecordsData } from "../types/redux";
import { IStorageBasic, IStorageKey, IStorageNamespace, IStorageSections } from "../types/storage";

/**
 * Ulozeni dat
 *
 * @param {string} guid ID kolekce
 * @param {IStorageKey} key Klic
 * @param {unknown} value Data
 */
async function write(guid: string, key: IStorageKey, value: unknown): Promise<void> {
	const raw = JSON.stringify(value);
	if (guid) {
		await AsyncStorage.setItem(`${key}[${guid}]`, raw);
	} else {
		await AsyncStorage.setItem(key, raw);
	}
}

/**
 * Nacteni objektu dat
 *
 * @param {string} guid ID kolekce
 * @param {IStorageKey} key Klic
 * @param {T} defaults Vychozi hodnota
 * @returns {Promise<T>} Data
 */
async function read<T>(guid: string, key: IStorageKey, defaults?: T): Promise<T> {
	// nacteni dat
	let raw = null;
	if (guid) {
		raw = await AsyncStorage.getItem(`${key}[${guid}]`);
	} else {
		raw = await AsyncStorage.getItem(key);
	}
	if (raw) {
		return JSON.parse(raw) as T;
	}
	// failsafe
	return defaults;
}

/**
 * Zaznamy
 */
const records: IStorageNamespace<IReduxRecordsData> = {
	read: async (guid) => read(guid, "records"),
	write: async (guid, data) => write(guid, "records", data)
};

/**
 * Nastaveni
 */
const options: IStorageNamespace<IReduxOptionsData> = {
	read: async (guid) => read(guid, "options"),
	write: async (guid, data) => write(guid, "options", data)
};

/**
 * Kolekce
 */
const collections: IStorageBasic<IReduxCollections> = {
	read: async () => read(null, "collections"),
	write: async (data) => write(null, "collections", data)
};

/**
 * Serializace storu
 *
 * @param {string} guid ID kolekce Kolekce
 * @returns {Promise<string>} Data
 */
async function stringify(guid: string): Promise<string> {
	// sestaveni dat
	const data: IStorageSections = {
		options: await options.read(guid),
		records: await records.read(guid)
	};
	// vraceni
	return JSON.stringify(data);
}

/**
 * Ziskani kompletnich dat
 *
 * @param {string} guid ID kolekce Kolekce
 * @returns {Promise<IStorageSections>} Data
 */
async function readAll(guid: string): Promise<IStorageSections> {
	// sestaveni dat
	const data = {
		options: await options.read(guid),
		records: await records.read(guid)
	};
	// vraceni
	return data;
}

// soubor databaze
export const DATABASE: string = "data.json";

// vychozi export
export default {
	collections,
	options,
	readAll,
	records,
	stringify
};
