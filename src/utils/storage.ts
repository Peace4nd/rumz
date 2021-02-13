import AsyncStorage from "@react-native-async-storage/async-storage";
import merge from "deepmerge";
import { ICollectionRecord } from "../types/collection";
import { IOptions } from "../types/options";
import { IStorageCollectionArray, IStorageCollectionObject, IStorageKey, IStorageRecord } from "../types/storage";

/**
 * Ulozeni dat
 *
 * @param {IStorageKey} key Klic
 * @param {unknown} value Data
 */
async function write(key: IStorageKey, value: unknown): Promise<void> {
	try {
		const raw = JSON.stringify(value);
		await AsyncStorage.setItem(key, raw);
	} catch (e) {
		// error
	}
}

/**
 * Nacteni kolekce
 *
 * @param {IStorageKey} key Klic
 * @param {T[]} defaults Vychozi hodnota
 * @returns {Promise<T[]>} Kolekce
 */
async function arrayRead<T extends IStorageRecord>(key: IStorageKey, defaults: T[] = []): Promise<T[]> {
	// nacteni dat
	try {
		const raw = await AsyncStorage.getItem(key);
		if (raw != null) {
			return JSON.parse(raw) as T[];
		}
	} catch (e) {
		// chyba se neresi
	}
	// failsafe
	return defaults;
}

/**
 * Odstraneni zaznamu z kolekce
 *
 * @param {IStorageKey} key Klic
 * @param {string} id Identifikator
 * @returns {Promise<T[]>} Kolekce
 */
async function arrayRemove<T extends IStorageRecord>(key: IStorageKey, id: string): Promise<T[]> {
	// nacteni uloziste
	const storage = await arrayRead<T>(key);
	// nazeleni zaznamu
	const index = storage.findIndex((rec) => rec.id === id);
	// odstraneni zaznamu
	storage.splice(index, 1);
	// ulozeni date
	await write(key, storage);
	// vraceni kolekce
	return storage;
}

/**
 * Nalezeni zaznamu v kolekci
 *
 * @param {IStorageKey} key Klic
 * @param {string} id Identifikator
 * @returns {Promise<T[]>} Kolekce
 */
async function arrayFind<T extends IStorageRecord>(key: IStorageKey, id: string): Promise<T> {
	// nacteni uloziste
	const storage = await arrayRead<T>(key);
	// nazeleni zaznamu
	return storage.find((rec) => rec.id === id);
}

/**
 * Pridani zaznamu do kolekce
 *
 * @param {IStorageKey} key Klic
 * @param {T} record Zaznam
 * @returns {Promise<T[]>} Kolekce
 */
async function arrayPush<T extends IStorageRecord>(key: IStorageKey, record: T): Promise<T[]> {
	// nacteni uloziste
	const storage = await arrayRead<T>(key);
	// pridani zaznamu
	storage.push(record);
	// ulozeni date
	await write(key, storage);
	// vraceni kolekce
	return storage;
}

/**
 * Aktualizace zaznamu v kolekci
 *
 * @param {IStorageKey} key Klic
 * @param {T} record Zaznam
 * @returns {Promise<T[]>} Kolekce
 */
async function arrayUpdate<T extends IStorageRecord>(key: IStorageKey, record: T): Promise<T[]> {
	// nacteni uloziste
	const storage = await arrayRead<T>(key);
	// nalezeni zaznamu
	const index = storage.findIndex((rec) => rec.id === record.id);
	// aktualizace dat
	storage[index] = record;
	// ulozeni date
	await write(key, storage);
	// vraceni kolekce
	return storage;
}

/**
 * Nacteni objektu dat
 *
 * @param {IStorageKey} key Klic
 * @param {T} defaults Vychozi hodnota
 * @returns {Promise<T>} Data
 */
async function objectRead<T>(key: IStorageKey, defaults: T = {} as T): Promise<T> {
	// nacteni dat
	try {
		const raw = await AsyncStorage.getItem(key);
		if (raw != null) {
			return JSON.parse(raw) as T;
		}
	} catch (e) {
		// chyba se neresi
	}
	// failsafe
	return defaults;
}

/**
 * Aktualizace zaznamu v kolekci
 *
 * @param {IStorageKey} key Klic
 * @param {T} record Zaznam
 * @returns {Promise<T>} Kolekce
 */
async function objectUpdate<T>(key: IStorageKey, record: T): Promise<T> {
	// nacteni uloziste
	const storage = await objectRead<T>(key);
	// aktualizace dat
	const updated: T = merge(storage, record);
	// ulozeni date
	await write(key, updated);
	// vraceni kolekce
	return updated;
}

/**
 * Kolekce
 */
export const collection: IStorageCollectionArray<ICollectionRecord, string> = {
	find: async (id) => arrayFind("collection", id),
	push: async (record) => arrayPush("collection", record),
	read: async () => arrayRead("collection"),
	remove: async (id) => arrayRemove("collection", id),
	update: async (record) => arrayUpdate("collection", record)
};

/**
 * Nastaveni
 */
export const options: IStorageCollectionObject<IOptions> = {
	read: async () => objectRead("options", { dram: 40 }),
	update: async (record) => objectUpdate("options", record)
};

// vychozi export
export default {
	collection,
	options
};
