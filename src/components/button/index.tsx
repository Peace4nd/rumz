import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "./components/link";
import Touchable from "./components/touchable";

export interface IButton {
	icon: IconDefinition;
	size?: number;
}

export default {
	Link,
	Touchable
};
