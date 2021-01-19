/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { FunctionComponent } from "react";
import { SvgProps } from "react-native-svg";

export type ICountryDefinition = Record<
	string,
	{
		name: string;
		flag: {
			default: FunctionComponent<SvgProps>;
		};
	}
>;

export default {
	bb: {
		flag: require("svg-country-flags/svg/bb.svg"),
		name: "Barbados"
	},
	gt: {
		flag: require("svg-country-flags/svg/gt.svg"),
		name: "Guatemala"
	},
	ph: {
		flag: require("svg-country-flags/svg/ph.svg"),
		name: "Filipíny"
	}
} as ICountryDefinition;
