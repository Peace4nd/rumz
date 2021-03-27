import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { IFormatOutput } from "../../utils/format";
import Typography from "../typography";
import styles from "./styles";

export interface IDisplayValue {
	label?: string;
	mandatory: boolean;
	formated?: IFormatOutput;
	render?: () => JSX.Element;
}

/**
 * Zobrazeni hodnoty
 *
 * @param {IDisplayValue} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const DisplayValue = (props: IDisplayValue): JSX.Element => {
	// rozlozeni props
	const { formated, label, mandatory, render } = props;
	// styly
	let mandatoryStyles: StyleProp<TextStyle> = null;
	if (formated?.empty === true) {
		mandatoryStyles = mandatory ? styles.valueMissingMandatory : styles.valueMissing;
	}
	// sestaveni
	return (
		<View style={[styles.wrapper]}>
			{label && (
				<Typography type="Headline6" style={styles.label}>
					{label}
				</Typography>
			)}
			{render ? (
				render()
			) : (
				<Typography type="Body1" style={mandatoryStyles}>
					{formated.value}
				</Typography>
			)}
		</View>
	);
};

export default DisplayValue;
