import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_STATE as collectionDefaul } from "../redux/reducers/collection";
import { DEFAULT_STATE as optionsDefault } from "../redux/reducers/options";
import { IDataCollection } from "../types/data";
import { IReduxCollection, IReduxOptions } from "../types/redux";
import { IStorageActions, IStorageKey, IStorageRemove, IStorageSections } from "../types/storage";

/**
 * Ulozeni dat
 *
 * @param {IStorageKey} key Klic
 * @param {unknown} value Data
 */
async function write(key: IStorageKey, value: unknown): Promise<void> {
	const raw = JSON.stringify(value);
	await AsyncStorage.setItem(key, raw);
}

/**
 * Nacteni objektu dat
 *
 * @param {IStorageKey} key Klic
 * @param {T} defaults Vychozi hodnota
 * @returns {Promise<T>} Data
 */
async function read<T>(key: IStorageKey, defaults?: T): Promise<T> {
	// nacteni dat
	const raw = await AsyncStorage.getItem(key);
	if (raw != null) {
		return JSON.parse(raw) as T;
	}
	// failsafe
	return defaults;
}

/**
 * Kolekce
 */
const collection: IStorageActions<IReduxCollection> & IStorageRemove = {
	read: async () => read("collection", collectionDefaul),
	remove: async (id) => {
		// nacteni a vyhledani zaznamu
		const records: IDataCollection[] = await read("collection");
		const index = records.findIndex((record) => record.id === id);
		// pokud existuje
		if (index !== -1) {
			records.splice(index, 1);
			await write("collection", records);
		}
	},
	write: async (data) => write("collection", data)
};

/**
 * Nastaveni
 */
const options: IStorageActions<IReduxOptions> = {
	read: async () => read("options", optionsDefault),
	write: async (data) => write("options", data)
};

/**
 * Serializace storu
 *
 * @returns {Promise<string>} Data
 */
async function stringify(): Promise<string> {
	// sestaveni dat
	const data: IStorageSections = {
		collection: await collection.read(),
		options: await options.read()
	};
	// vraceni
	return JSON.stringify(data);
}

/**
 * Ziskani kompletnich dat
 *
 * @returns {Promise<IStorageSections>} Data
 */
async function readAll(): Promise<IStorageSections> {
	// sestaveni dat
	const data = {
		collection: await collection.read(),
		options: await options.read()
	};
	// vraceni
	return data;
}

// soubor databaze
export const DATABASE: string = "data.json";

// vychozi export
export default {
	collection,
	options,
	readAll,
	stringify
};
