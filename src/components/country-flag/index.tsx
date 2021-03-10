import React from "react";
import { View, ViewProps } from "react-native";
import country from "../../utils/country";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface ICountryFlag extends ViewProps {
	code: string;
}

/**
 * Vlajka zeme
 *
 * @param {ICountryFlag} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const CountryFlag = (props: ICountryFlag): JSX.Element => {
	// rozlozeni props
	const { code, style, ...rest } = props;
	// overeni
	if (!country?.[code]) {
		return null;
	}
	// sestaveni a vraceni
	return (
		<View style={[styles.flagWrapper, style]} {...rest}>
			{React.createElement(country[code].flag.default, {
				height: "100%",
				preserveAspectRatio: "none",
				width: "100%"
			})}
		</View>
	);
};

export default CountryFlag;
