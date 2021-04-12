import update from "immutability-helper";
import { IDataCollection, IDataCollectionCompleteness, IDataOptions } from "../../types/data";
import { IReduxAction, IReduxCollection } from "../../types/redux";

// vychozi state
export const DEFAULT_STATE: IReduxCollection = {
	changed: new Date(),
	completeness: {},
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
			// priprava
			const payload = action.payload as { options: IDataOptions; records: IDataCollection[] };
			// vyrobci + mira dokonceni
			action.async({ type: "collection-predefined" });
			action.async({ payload: payload.options, type: "collection-completeness" });
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				init: {
					$set: true
				},
				records: {
					$set: payload.records || DEFAULT_STATE.records
				}
			});
		}
		case "collection-push": {
			// priprava
			const payload = action.payload as { options: IDataOptions; record: IDataCollection };
			// vyrobci + mira dokonceni
			action.async({ type: "collection-predefined" });
			action.async({ payload: payload.options, type: "collection-completeness" });
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				records: {
					$push: [payload.record]
				}
			});
		}
		case "collection-update": {
			// priprava
			const payload = action.payload as { id: string; options: IDataOptions; record: Partial<IDataCollection> };
			const index = state.records.findIndex((record) => record.id === payload.id);
			// vyrobci + mira dokonceni
			action.async({ type: "collection-predefined" });
			action.async({ payload: payload.options, type: "collection-completeness" });
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
			// priprava
			const payload = action.payload as { options: IDataOptions; id: string };
			const index = state.records.findIndex((record) => record.id === payload.id);
			// vyrobci + mira dokonceni
			action.async({ type: "collection-predefined" });
			action.async({ payload: payload.options, type: "collection-completeness" });
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
		case "collection-completeness": {
			// definice
			const options = action.payload as IDataOptions;
			const completeness: IDataCollectionCompleteness = {};
			// prochazeni zaznamu
			for (const record of state.records) {
				let complete = true;
				options.mandatory.forEach((property) => {
					complete = complete && Boolean(record[property]);
				});
				completeness[record.id] = complete;
			}
			// aktualizace
			return update(state, {
				completeness: {
					$set: completeness
				}
			});
		}
	}
	return state;
};
