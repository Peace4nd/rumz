import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IRouterAvailable } from "../../utils/router";
import Link from "./components/link";
import Touchable from "./components/touchable";

export interface IButton {
	route?: IRouterAvailable;
	onPress?: () => void;
	icon: IconDefinition;
	size?: number;
}

export default {
	Link,
	Touchable
};
