/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention */

import React from "react";
import { ImageSourcePropType, TouchableHighlightProps } from "react-native";
import { SvgProps } from "react-native-svg";

declare module "react-router-native" {
	interface LinkProps extends TouchableHighlightProps {}
}

declare module "*.png" {
	const content: ImageSourcePropType;
	export default content;
}

declare module "*.svg" {
	const content: React.FC<SvgProps>;
	export default content;
}
