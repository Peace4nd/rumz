import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { debounce } from "throttle-debounce";
import storage from "../utils/storage";
import backup from "./reducers/backup";
import collections from "./reducers/collections";
import google from "./reducers/google";
import options from "./reducers/options";
import records from "./reducers/records";

// reducery
const reducers = combineReducers({
	backup,
	collections,
	google,
	options,
	records
});

// priprava
const middleware = applyMiddleware(thunk);
const store = createStore(reducers, {}, middleware);

// serializace dat do uloziste
const handleChange = debounce(1000, () => {
	// aktualni stav
	const state = store.getState();
	// serializace
	storage.collections.write(state.collections);
	storage.records.write(state.records);
	storage.options.write(state.options);
});
store.subscribe(handleChange);

// export
export default store;
