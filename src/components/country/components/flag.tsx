import React from "react";
import { View, ViewProps } from "react-native";
import { Measurement } from "../../../styles";
import country from "../../../utils/country";
import styles from "../styles";

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
	const { code } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.flagWrapper}>{React.createElement(country[code].flag.default, { height: Measurement.Icon / 1.5, width: Measurement.Icon })}</View>
	);
};

export default CountryFlag;
