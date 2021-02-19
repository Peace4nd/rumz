import { GoogleSignin, User } from "@react-native-community/google-signin";
import mime from "mime";

export interface IGoogleDriveMetaFile {
	id: string;
	kind: "drive#file";
	mimeType: string;
	name: string;
}

export interface IGoogleDriveMetaFiles {
	files: IGoogleDriveMetaFile[];
	incompleteSearch: boolean;
	kind: "drive#fileList";
}

export interface IGoogleDriveMetaCreate {
	name: string;
	mimeType?: string;
	description?: string;
	parents?: string[];
}

// globalni promenne
const BOUNDARY = "foo_bar_baz";
const EOL = "\r\n";
let TOKEN: string = null;

/**
 * Vytvoreni multi-part dat pro upload souboru
 *
 * @param {IGoogleDriveMetaCreate} meta Metadata
 * @param {string} content Obsah souboru
 * @returns {string} Multi-part data
 */
function createUploadBody(meta: IGoogleDriveMetaCreate, content: string): string {
	// metadata
	const merged: IGoogleDriveMetaCreate = {
		...meta,
		mimeType: meta.mimeType ? meta.mimeType : mime.getType(meta.name)
	};
	// request body
	const multipart =
		EOL +
		`--${BOUNDARY}${EOL}Content-Type: application/json; charset=UTF-8${EOL}${EOL}` +
		`${JSON.stringify(merged)}${EOL}` +
		`--${BOUNDARY}${EOL}Content-Type: ${mime.getType(meta.name)}${EOL}${EOL}` +
		`${content}${EOL}` +
		`--${BOUNDARY}--`;

	return multipart;
}

/**
 * Vytvoreni souboru
 *
 * @param {IGoogleDriveMetaCreate} meta Metadata
 * @param {string} content Obsah souboru
 * @returns {Promise<IGoogleDriveMetaFile>} Metadata souboru
 */
export async function create(meta: IGoogleDriveMetaCreate, content: string): Promise<IGoogleDriveMetaFile> {
	// body
	const body = createUploadBody({ ...meta, parents: ["appDataFolder"] }, content);
	// fetch
	const fetched = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`, {
		body,
		headers: {
			"Authorization": `Bearer ${TOKEN}`,
			"Content-Type": `multipart/related; boundary=${BOUNDARY}`
		},
		method: "POST"
	});
	// parse
	const parsed = (await fetched.json()) as IGoogleDriveMetaFile;
	// vraceni
	return parsed;
}

/**
 * Aktualizace souboru
 *
 * @param {string} fileId ID souboru
 * @param {string} content Obsah souboru
 * @returns {Promise<IGoogleDriveMetaFile>} Metadata souboru
 */
export async function update(fileId: string, content: string): Promise<IGoogleDriveMetaFile> {
	// fetch
	const fetched = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
		body: content,
		headers: {
			"Authorization": `Bearer ${TOKEN}`,
			"Content-Lenght": String(content.length),
			"Content-Type": "application/octet-stream"
		},
		method: "PUT"
	});
	// parse
	const parsed = (await fetched.json()) as IGoogleDriveMetaFile;
	// vraceni
	return parsed;
}

/**
 * Prehled dostupnych souboru
 *
 * @returns {Promise<IGoogleDriveMetaFiles>} Metadata dostupnych souboru
 */
export async function list(): Promise<IGoogleDriveMetaFiles> {
	// fetch
	const fetched = await fetch("https://www.googleapis.com/drive/v3/files?&spaces=appDataFolder", {
		headers: {
			Authorization: `Bearer ${TOKEN}`
		},
		method: "GET"
	});
	// parse
	const parsed = (await fetched.json()) as IGoogleDriveMetaFiles;
	// vraceni
	return parsed;
}

/**
 * Stazeni
 *
 * @param {string} fileId ID souboru
 * @returns {Promise<string>} Soubor
 */
export async function download(fileId?: string): Promise<string> {
	// fetch
	const fetched = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
		headers: {
			Authorization: `Bearer ${TOKEN}`
		},
		method: "GET"
	});
	// parse
	const content = await fetched.text();
	// vraceni
	return content;
}

// export
export default {
	/**
	 * Autorizace
	 */
	auth: {
		getCurrentUser: (): Promise<User> => GoogleSignin.getCurrentUser(),

		getToken: async (): Promise<void> => {
			const tokens = await GoogleSignin.getTokens();
			TOKEN = tokens.accessToken;
		},

		/**
		 * Overeni prihlaseni
		 *
		 * @returns {Promise<boolean>} Prihlaseno
		 */
		isSignedIn: (): Promise<boolean> => GoogleSignin.isSignedIn(),

		/**
		 * Prihlaseni
		 *
		 * @returns {Promise<IGoogleData>} Data
		 */
		signIn: (): Promise<User> => GoogleSignin.signIn()
	},

	drive: {
		create,
		download,
		list,
		update
	}
};
