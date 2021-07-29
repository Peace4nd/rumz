import update from "immutability-helper";
import { IReduxAction, IReduxCollections, IReduxCollectionsData } from "../../types/redux";

// vychozi state
export const DEFAULT_STATE: IReduxCollections = {
	selected: null,
	stored: {}
};

/**
 * Konfigurace
 *
 * @param {IReduxCollections} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxCollections} Store
 */
export default (state: IReduxCollections = DEFAULT_STATE, action: IReduxAction): IReduxCollections => {
	switch (action.type) {
		case "collections-load": {
			return update(state, {
				$set: action.payload as IReduxCollections
			});
		}
		case "collections-add": {
			// pretypovani
			const payload = action.payload as {
				collection: IReduxCollectionsData;
				guid: string;
			};
			// aktualizace
			return update(state, {
				selected: {
					$set: payload.guid
				},
				stored: {
					[payload.guid]: {
						$set: payload.collection
					}
				}
			});
		}
	}
	return state;
};
