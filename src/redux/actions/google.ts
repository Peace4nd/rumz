import { User } from "@react-native-community/google-signin";
import { IReduxAction, IReduxGoogle } from "../../types/redux";

/**
 * Nastaveni uzivatele a tokenu
 *
 * @param {User} user Data uzivatele
 * @param {string} token token Token
 * @returns {IReduxAction<IReduxGoogle>} Akce
 */
export function signIn(user: User, token: string): IReduxAction<Partial<IReduxGoogle>> {
	return {
		payload: {
			token,
			user
		},
		type: "google-signin"
	};
}
