import { User } from "@react-native-community/google-signin";
import { Action } from "redux";

/**
 * Google
 */
export interface IReduxGoogle {
	user: User;
	token: string;
	signed: boolean;
}

/**
 * Typy
 */
export type IReduxType = "google-signin";

/**
 * Akce
 */
export interface IReduxAction<P = unknown> extends Action<IReduxType> {
	payload?: P;
}

/**
 * Store
 */
export interface IReduxStore {
	google: IReduxGoogle;
}
