import { IReduxAction } from "../../types/redux";
import { IGoogleDriveFile } from "../../utils/google";

/**
 * Nacteni zalohy
 *
 * @param {IGoogleDriveFile[]} files Soubory zalohy
 * @returns {IReduxAction} Akce
 */
export function loadBackup(files: IGoogleDriveFile[]): IReduxAction {
	return {
		payload: files,
		type: "backup-load"
	};
}
