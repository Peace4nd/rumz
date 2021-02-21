import { User } from "@react-native-community/google-signin";
import { Action } from "redux";
import { IDataCollection, IDataOptions } from "./data";

/**
 * Typy
 */
export type IReduxType = "google-resolved" | "google-token" | "collection-load" | "collection-push" | "collection-update" | "options-load" | "options-update";

/**
 * Akce
 */
export interface IReduxAction<P = unknown> extends Action<IReduxType> {
	payload?: P;
}

/**
 * Sdilene vlastnisti pro wrapper
 */
export interface IDataWrapperShared {
	changed: Date;
	init: boolean;
}

/**
 * Wrapper pro pole
 */
export interface IDataWrapperArray<T> extends IDataWrapperShared {
	records: T[];
}

/**
 * Wrapper pro objekt
 */
export interface IDataWrapperObject<T> extends IDataWrapperShared {
	values: T;
}

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
 * Kolekce
 */
export type IReduxCollection = IDataWrapperArray<IDataCollection>;

/**
 * Nastaveni
 */
export type IReduxOptions = IDataWrapperObject<IDataOptions>;

/**
 * Store
 */
export interface IReduxStore {
	google: IReduxGoogle;
	collection: IReduxCollection;
	options: IReduxOptions;
}
