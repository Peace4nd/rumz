import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Date from "./components/date";
import Image from "./components/image";
import Multiline from "./components/multiline";
import Number from "./components/number";
import Picker from "./components/picker";
import Text from "./components/text";

export interface IInput<V> {
	placeholder: string;
	value: V;
	onChange: (value: V) => void;
	icon: IconDefinition;
	error?: string;
}

export default {
	Date,
	Image,
	Multiline,
	Number,
	Picker,
	Text
};
