import { combineReducers, createStore } from "redux";
import { debounce } from "throttle-debounce";
import { IReduxStore } from "../types/redux";
import storage from "../utils/storage";
import collection from "./reducers/collection";
import google from "./reducers/google";
import options from "./reducers/options";

// reducery
const reducers = combineReducers({
	collection,
	google,
	options
});

// priprava
const store = createStore(reducers, {});

// serializace dat do uloziste
let currentState: IReduxStore = null;
const handleChange = debounce(1000, () => {
	// predchoyi stav
	const previousState: IReduxStore = currentState;
	// aktualni stav
	currentState = store.getState();
	// pokud predchoyi stav neexistuje
	if (previousState === null) {
		storage.collection.write(currentState.collection);
		storage.options.write(currentState.options);
	} else {
		// kolekce
		if (previousState.collection.changed !== currentState.collection.changed) {
			storage.collection.write(currentState.collection);
		}
		// nastaveni
		if (previousState.options.changed !== currentState.options.changed) {
			storage.options.write(currentState.options);
		}
	}
});
store.subscribe(handleChange);

// export
export default store;
