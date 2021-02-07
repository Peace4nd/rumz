import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Date from "./components/date";
import Image from "./components/image";
import Multiline from "./components/multiline";
import Number from "./components/number";
import Picker from "./components/picker";
import Text from "./components/text";

export interface IInputState {
	filled: boolean;
	valid: boolean;
}
export interface IInput<V> {
	/**
	 * Placeholder
	 */
	placeholder?: string;

	/**
	 * Vychozi hodnota
	 */
	value?: V;

	/**
	 * Zmena hodnoty
	 */
	onChange: (value: V, state: IInputState) => void;

	/**
	 * Ikona
	 */
	icon?: IconDefinition;

	/**
	 * Validator
	 */
	validator?: (value: V) => string;

	/**
	 * Zvyrazneni
	 */
	highlight?: boolean;
}

export default {
	Date,
	Image,
	Multiline,
	Number,
	Picker,
	Text
};
