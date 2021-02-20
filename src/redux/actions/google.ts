import { User } from "@react-native-community/google-signin";
import { IReduxAction } from "../../types/redux";

/**
 * Overeni prihlaseni
 *
 * @param {User["user"]} user Data uzivatele
 * @returns {IReduxAction} Akce
 */
export function signResolved(user?: User["user"]): IReduxAction {
	return {
		payload: user,
		type: "google-resolved"
	};
}

/**
 * Nastaveni bezpecnostniho tokenu
 *
 * @param {string} token Token
 * @returns {IReduxAction} Akce
 */
export function setToken(token: string): IReduxAction {
	return {
		payload: token,
		type: "google-token"
	};
}
