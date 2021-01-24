import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICollectionRecord } from "../types/collection";

/**
 * Typ uloziste
 */
type IStorageKey = "collection";

/**
 * Ulozeni dat
 *
 * @param {IStorageKey} key Klic
 * @param {unknown} value Data
 */
async function storageWrite(key: IStorageKey, value: unknown): Promise<void> {
	try {
		const raw = JSON.stringify(value);
		await AsyncStorage.setItem(key, raw);
	} catch (e) {
		// error
	}
}

/**
 * Nacteni dat
 *
 * @param {IStorageKey} key Klic
 * @returns {Promise<T>} Data
 */
async function storageRead<T = unknown>(key: IStorageKey): Promise<T> {
	try {
		const raw = await AsyncStorage.getItem(key);
		if (raw != null) {
			return JSON.parse(raw) as T;
		}
		return null;
	} catch (e) {
		// error
	}
}

/**
 * Kolekce
 */
export const collection = {
	/**
	 * Nalezeni zaznamu v kolekci
	 *
	 * @param {ICollectionRecord["id"]} id ID
	 * @returns {Promise<ICollectionRecord>} Zaznam z kolekce
	 */
	find: async (id: ICollectionRecord["id"]): Promise<ICollectionRecord> => {
		// nacteni uloziste
		const storage = await storageRead<ICollectionRecord[]>("collection");
		// nazeleni zaznamu
		return storage.find((record) => {
			return record.id === id;
		});
	},

	/**
	 * Pridani zaznamu do kolekce
	 *
	 * @param {ICollectionRecord} record Zaznam
	 * @returns {Promise<ICollectionRecord[]>} Kompletni kolekce
	 */
	push: async (record: ICollectionRecord): Promise<ICollectionRecord[]> => {
		// nacteni uloziste
		const storage = (await storageRead<ICollectionRecord[]>("collection")) || [];
		// pridani zaznamu
		storage.push(record);
		// ulozeni date
		storageWrite("collection", storage);
		// vraceni kolekce
		return storage;
	},

	/**
	 * Nacteni cele kolekce
	 *
	 * @returns {Promise<ICollectionRecord[]>} Kompletni kolekce
	 */
	read: async (): Promise<ICollectionRecord[]> => {
		// nacteni uloziste
		const storage = await storageRead<ICollectionRecord[]>("collection");
		// vraceni kolekce
		return storage || [];
	},

	/**
	 * Odstraneni zaznamu z kolekce
	 *
	 * @param {ICollectionRecord["id"]} id ID
	 * @returns {Promise<ICollectionRecord>} Kompletni kolekce
	 */
	remove: async (id: ICollectionRecord["id"]): Promise<ICollectionRecord[]> => {
		// nacteni uloziste
		const storage = await storageRead<ICollectionRecord[]>("collection");
		// nazeleni zaznamu
		const index = storage.findIndex((record) => record.id === id);
		// odstraneni zaznamu
		storage.splice(index, 1);
		// ulozeni date
		storageWrite("collection", storage);
		// vraceni kolekce
		return storage;
	}
};
