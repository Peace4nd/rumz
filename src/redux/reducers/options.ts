import update from "immutability-helper";
import { IDataOptions } from "../../types/data";
import { IReduxAction, IReduxOptions } from "../../types/redux";

// vychozi state
const DEFAULT_STATE: IReduxOptions = {
	changed: new Date(),
	init: false,
	values: {
		dram: 40,
		properties: []
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
					$set: action.payload as IDataOptions
				}
			});
		}
		case "options-update": {
			return update(state, {
				changed: {
					$set: new Date()
				},
				values: {
					$merge: action.payload as Partial<IDataOptions>
				}
			});
		}
	}
	return state;
};
