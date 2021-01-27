import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
import { Color, Measurement } from "../../../styles";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IInputMultiline extends IInput<string> {
	lines: number;
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
		<View style={[styles.wrapperBasic, styles.wrapperMultiline]}>
			<FontAwesomeIcon style={[styles.iconBasic, styles.iconMultiline]} icon={icon} size={Measurement.Icon} />
			<TextInput
				style={[styles.fieldBasic, styles.fieldMultiline]}
				value={value || ""}
				multiline={true}
				numberOfLines={lines}
				placeholder={placeholder}
				placeholderTextColor={Color.Primary.Muted}
				onChangeText={onChange}
			/>
		</View>
	);
};

// export
export default InputMultiline;
