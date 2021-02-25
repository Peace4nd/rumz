import update from "immutability-helper";
import { IDataOptions } from "../../types/data";
import { IReduxAction, IReduxOptions } from "../../types/redux";
import merge, { IMergeArray } from "../../utils/merge";

// vychozi state
export const DEFAULT_STATE: IReduxOptions = {
	changed: new Date(),
	init: false,
	values: {
		cask: [],
		dram: 40,
		properties: {
			aroma: [],
			color: [],
			taste: []
		}
	}
};

/**
 * Konfigurace
 *
 * @param {IReduxOptions} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxOptions} Store
 */
export default (state: IReduxOptions = DEFAULT_STATE, action: IReduxAction): IReduxOptions => {
	switch (action.type) {
		case "options-load": {
			return update(state, {
				changed: {
					$set: new Date()
				},
				init: {
					$set: true
				},
				values: {
					$set: (action.payload as IDataOptions) || DEFAULT_STATE.values
				}
			});
		}
		case "options-update": {
			// pretypovani
			const payload = action.payload as {
				values: Partial<IDataOptions>;
				array: IMergeArray;
			};
			// aktualizace
			return update(state, {
				changed: {
					$set: new Date()
				},
				values: {
					$merge: merge(state.values, payload.values, payload.array)
				}
			});
		}
	}
	return state;
};
