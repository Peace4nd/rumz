import update from "immutability-helper";
import { IReduxAction, IReduxGoogle } from "../../types/redux";

// vychozi state
const DEFAULT_STATE: IReduxGoogle = {
	signed: false,
	token: null,
	user: null
};

/**
 * Konfigurace
 *
 * @param {IReduxConfig} state Aktualni stav
 * @param {IReduxAction} action Akce
 * @returns {IReduxConfig} Store
 */
export default (state: IReduxGoogle = DEFAULT_STATE, action: IReduxAction): IReduxGoogle => {
	switch (action.type) {
		case "google-signin": {
			return update(state, {
				$merge: action.payload,
				signed: {
					$set: true
				}
			});
		}
	}
	return state;
};
