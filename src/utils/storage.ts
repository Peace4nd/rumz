import AsyncStorage from "@react-native-async-storage/async-storage";
import { IReduxCollection, IReduxOptions } from "../types/redux";
import { IStorageKey, IStorageSection } from "../types/storage";

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
 * @returns {Promise<T>} Data
 */
async function read<T>(key: IStorageKey): Promise<T> {
	// nacteni dat
	const raw = await AsyncStorage.getItem(key);
	if (raw != null) {
		return JSON.parse(raw) as T;
	}

	// failsafe
	return null;
}

/**
 * Kolekce
 */
const collection: IStorageSection<IReduxCollection> = {
	read: async () => read("collection"),
	write: async (data) => write("collection", data)
};

/**
 * Nastaveni
 */
const options: IStorageSection<IReduxOptions> = {
	read: async () => read("options"),
	write: async (data) => write("options", data)
};

/**
 * Serializace storu
 *
 * @returns {Promise<string>} Data
 */
async function stringify(): Promise<string> {
	// sestaveni dat
	const data: Record<IStorageKey, unknown> = {
		collection: await collection.read(),
		options: await options.read()
	};
	// vraceni
	return JSON.stringify(data);
}

/**
 * Ziskani kompletnich dat
 *
 * @returns {Promise<Record<IStorageKey, unknown>>} Data
 */
async function readAll(): Promise<Record<IStorageKey, unknown>> {
	// sestaveni dat
	const data = {
		collection: await collection.read(),
		options: await options.read()
	};
	// vraceni
	return data;
}

// vychozi export
export default {
	collection,
	options,
	readAll,
	stringify
};
