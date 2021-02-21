import update from "immutability-helper";
import { IDataCollection } from "../../types/data";
import { IReduxAction, IReduxCollection } from "../../types/redux";

// vychozi state
const DEFAULT_STATE: IReduxCollection = {
	changed: new Date(),
	init: false,
	records: []
};

/**
 * Kolekce
 *
 * @param {IReduxCollection} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxCollection} Store
 */
export default (state: IReduxCollection = DEFAULT_STATE, action: IReduxAction): IReduxCollection => {
	switch (action.type) {
		case "collection-load": {
			return update(state, {
				changed: {
					$set: new Date()
				},
				init: {
					$set: true
				},
				records: {
					$set: action.payload
				}
			});
		}
		case "collection-push": {
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					$push: [action.payload as IDataCollection]
				}
			});
		}
		case "collection-update": {
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					$push: [action.payload as IDataCollection]
				}
			});
		}
	}
	return state;
};
