import { User } from "@react-native-community/google-signin";
import { Action } from "redux";
import { IGoogleDriveFile } from "../utils/google";
import { IDataCollection, IDataOptions } from "./data";

/**
 * Typy
 */
export type IReduxType =
	| "google-resolved"
	| "google-token"
	| "collection-load"
	| "collection-push"
	| "collection-update"
	| "collection-remove"
	| "options-load"
	| "options-update"
	| "backup-load";

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
 * Zaloha
 */
export interface IReduxBackup {
	loaded: boolean;
	files: IGoogleDriveFile[];
	exist: boolean;
	database: IGoogleDriveFile;
	modified: string;
	stats: {
		records: number;
		size: number;
	};
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
	backup: IReduxBackup;
	google: IReduxGoogle;
	collection: IReduxCollection;
	options: IReduxOptions;
}
