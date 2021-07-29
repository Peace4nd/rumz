import { User } from "@react-native-community/google-signin";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IGoogleDriveFile } from "../utils/google";

/**
 * Typy
 */
export type IReduxType =
	| "google-resolved"
	| "google-token"
	| "backup-load"
	| "collections-load"
	| "collections-add"
	| "options-load"
	| "options-update"
	// refactor
	| "collection-bottle"
	| "collection-load"
	| "collection-push"
	| "collection-update"
	| "collection-remove"
	| "collection-predefined"
	| "collection-completeness";

/**
 * Akce
 */
export type IReduxAction = Action<IReduxType> & { payload?: unknown };

/**
 * Thunk
 */
export type IReduxThunk = ThunkAction<void, IReduxStore, unknown, IReduxAction>;

/**
 * Dispatch
 */
export interface IReduxDispatch {
	dispatch: ThunkDispatch<IReduxStore, unknown, IReduxAction>;
}

/**
 * Sdilene vlastnisti pro wrapper
 */
export interface IReduxData {
	changed: Date;
	init: boolean;
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
 * Zaznamy konkretni kolekce
 */
export interface IReduxRecordsData extends IReduxData {
	data: any[];
}

/**
 * Zaznamy vsech kolekci
 */
export type IReduxRecords = Record<string, IReduxRecordsData>;

/**
 * Nastaveni konkretni kolekce
 */
export interface IReduxOptionsData extends IReduxData {
	data: any;
}

/**
 * Nastaveni vsech kolekci
 */
export type IReduxOptions = Record<string, IReduxOptionsData>;

/**
 * Informace o kolekce
 */
export interface IReduxCollectionsData {
	title: string;
	created: Date;
	changed: Date;
	records: number;
}

/**
 * Kolekce
 */
export interface IReduxCollections {
	selected: string;
	stored: Record<string, IReduxCollectionsData>;
}

/**
 * Store
 */
export interface IReduxStore {
	backup: IReduxBackup;
	google: IReduxGoogle;
	records: IReduxRecords;
	collections: IReduxCollections;
	options: IReduxOptions;
}
