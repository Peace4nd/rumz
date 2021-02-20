import { User } from "@react-native-community/google-signin";
import { Action } from "redux";

/**
 * Google
 */
export interface IReduxGoogle {
	user: User["user"];
	signed: boolean;
	resolved: boolean;
	token: string;
}

/**
 * Typy
 */
export type IReduxType = "google-resolved" | "google-token";

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
