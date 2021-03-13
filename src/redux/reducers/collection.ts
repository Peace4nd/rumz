import update from "immutability-helper";
import { IDataCollection } from "../../types/data";
import { IReduxAction, IReduxCollection } from "../../types/redux";

// vychozi state
export const DEFAULT_STATE: IReduxCollection = {
	changed: new Date(),
	init: false,
	predefined: {
		manufacturer: []
	},
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
			// preddefinovani vyrobci
			action.async({ type: "collection-predefined" });
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				init: {
					$set: true
				},
				records: {
					$set: action.payload || DEFAULT_STATE.records
				}
			});
		}
		case "collection-push": {
			// preddefinovani vyrobci
			action.async({ type: "collection-predefined" });
			// aktualizace
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
			// priprava
			const payload = action.payload as { id: string; record: Partial<IDataCollection> };
			const index = state.records.findIndex((record) => record.id === payload.id);
			// preddefinovani vyrobci
			action.async({ type: "collection-predefined" });
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					[index]: {
						$merge: payload.record
					}
				}
			});
		}
		case "collection-remove": {
			// nalezeni
			const index = state.records.findIndex((record) => record.id === action.payload);
			// preddefinovani vyrobci
			action.async({ type: "collection-predefined" });
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					$splice: [[index, 1]]
				}
			});
		}
		case "collection-predefined": {
			// definice
			const manufacturer: string[] = [];
			// naplneni
			state.records.forEach((record) => {
				if (!manufacturer.includes(record.manufacturer)) {
					manufacturer.push(record.manufacturer);
				}
			});
			// aktualizace
			return update(state, {
				predefined: {
					manufacturer: {
						$set: manufacturer
					}
				}
			});
		}
	}
	return state;
};
