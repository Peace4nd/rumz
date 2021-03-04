import { Alert } from "react-native";
import strings from "./strings";

export interface IConfirm {
	onConfirm: () => void;
	onDismiss?: () => void;
	description?: string;
	cancelable?: boolean;
}

export type IConfirmFunction = () => void;

export default {
	/**
	 * Potvrzeni smazani
	 *
	 * @param {IConfirm} options Nastaveni
	 * @returns {IConfirmFunction} Potvrzovaci funkce
	 */
	delete: (options: IConfirm): IConfirmFunction => {
		return () => {
			Alert.alert(
				strings("confirmTitleDelete"),
				options?.description,
				[
					{
						onPress: options.onConfirm,
						style: "destructive",
						text: strings("confirmButtonConfirm")
					},
					{
						onPress: options?.onDismiss,
						style: "cancel",
						text: strings("confirmButtonCancel")
					}
				],
				{
					cancelable: options?.cancelable ?? false,
					onDismiss: options?.onDismiss
				}
			);
		};
	}
};
