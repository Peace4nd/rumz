import { combineReducers, createStore } from "redux";
import google from "./reducers/google";

// reducery
const reducers = combineReducers({
	google
});

// priprava
const store = createStore(reducers, {});

// export
export default store;
