/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention */

import { ImageSourcePropType, TouchableHighlightProps } from "react-native";

declare module "react-router-native" {
	interface LinkProps extends TouchableHighlightProps {}
}

declare module "*.png" {
	const content: ImageSourcePropType;
	export default content;
}
