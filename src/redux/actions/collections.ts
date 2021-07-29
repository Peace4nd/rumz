import { v4 } from "uuid";
import { IReduxCollections, IReduxCollectionsData, IReduxThunk } from "../../types/redux";

/**
 * Nacteni nastaveni
 *
 * @param {Partial<IReduxCollections>} collections Hodnoty
 * @returns {IReduxThunk} Akce
 */
export function loadCollections(collections: IReduxCollections): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: collections,
			type: "collections-load"
		});
	};
}

/**
 * Aktualizace nastaveni
 *
 * @param {IReduxCollectionsData} collection Kolekce
 * @returns {IReduxThunk} Akce
 */
export function addCollection(collection: IReduxCollectionsData): IReduxThunk {
	return (dispatch) => {
		dispatch({
			payload: {
				collection,
				guid: v4()
			},
			type: "collections-add"
		});
	};
}
