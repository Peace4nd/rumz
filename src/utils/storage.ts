import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICollectionRecord } from "../types/collection";
import { IStorageKey } from "../types/storage";

/**
 * Zakladni struktura zaznamu
 */
export interface IStorageRecord {
	/**
	 * Unikatni identifikator
	 */
	id: string;
}

/**
 * Kolekce uloziste
 */
export interface IStorageCollection<R, I> {
	/**
	 * Nalezeni zaznamu v kolekci
	 *
	 * @param {I} id ID
	 * @returns {Promise<R>} Zaznam z kolekce
	 */
	find: (id: I) => Promise<R>;
	/**
	 * Pridani zaznamu do kolekce
	 *
	 * @param {R} record Zaznam
	 * @returns {Promise<R[]>} Kompletni kolekce
	 */
	push: (record: R) => Promise<R[]>;

	/**
	 * Nacteni cele kolekce
	 *
	 * @returns {Promise<R[]>} Kompletni kolekce
	 */
	read: () => Promise<R[]>;

	/**
	 * Odstraneni zaznamu z kolekce
	 *
	 * @param {I} id ID
	 * @returns {Promise<R>} Kompletni kolekce
	 */
	remove: (id: I) => Promise<R[]>;

	/**
	 * Aktualizace zaznamu v kolekci
	 *
	 * @param {R} record Zaznam
	 * @returns {Promise<R>} Kompletni kolekce
	 */
	update: (record: R) => Promise<R[]>;
}

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
 * Nacteni objektu dat
 *
 * @param {IStorageKey} key Klic
 * @returns {Promise<T>} Data
 */
async function objectRead<T extends IStorageRecord>(key: IStorageKey): Promise<T> {
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
	return {} as T;
}

/**
 * Nacteni kolekce
 *
 * @param {IStorageKey} key Klic
 * @returns {Promise<T[]>} Kolekce
 */
async function arrayRead<T extends IStorageRecord>(key: IStorageKey): Promise<T[]> {
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
	return [] as T[];
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
 * Kolekce
 */
export const collection: IStorageCollection<ICollectionRecord, string> = {
	find: async (id) => arrayFind("collection", id),
	push: async (record) => arrayPush("collection", record),
	read: async () => arrayRead("collection"),
	remove: async (id) => arrayRemove("collection", id),
	update: async (record) => arrayUpdate("collection", record)
};

// vychozi export
export default {
	collection
};
