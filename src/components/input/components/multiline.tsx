import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Measurement } from "../../../styles";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IInputMultiline {
	placeholder: string;
	value: string;
	icon: IconDefinition;
	lines: number;
	onChange: (value: string) => void;
}

/**
 * Viceradkovy textovy vstup
 *
 * @param {IInputMultiline} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const InputMultiline = (props: IInputMultiline): JSX.Element => {
	// rozlozeni props
	const { icon, lines, onChange, placeholder, value } = props;
	// sestaveni a vraceni
	return (
		<View style={StyleSheet.flatten([styles.wrapperBasic, styles.wrapperMultiline])}>
			<FontAwesomeIcon style={StyleSheet.flatten([styles.iconBasic, styles.iconMultiline])} icon={icon} size={Measurement.Icon} />
			<TextInput
				style={StyleSheet.flatten([styles.fieldBasic, styles.fieldMultiline])}
				value={value || ""}
				multiline={true}
				numberOfLines={lines}
				placeholder={placeholder}
				onChangeText={onChange}
			/>
		</View>
	);
};

// export
export default InputMultiline;
