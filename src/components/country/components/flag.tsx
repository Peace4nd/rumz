import React from "react";
import { ViewProps } from "react-native";
import definition from "../definition";

export interface ICountryFlag extends ViewProps {
	code: string;
}

const Image = (props: ICountryFlag): JSX.Element => {
	// rozlozeni props
	const { code, ...rest } = props;
	// sestaveni a vraceni
	return React.createElement(definition[code].flag.default, rest);
};

export default Image;
