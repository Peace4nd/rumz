import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { Measurement } from "../../../styles";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IInputText {
	placeholder: string;
	value: string;
	icon: IconDefinition;
	onChange: (value: string) => void;
}

/**
 * Textovy vstup
 *
 * @param {IInputText} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const InputText = (props: IInputText): JSX.Element => {
	// rozlozeni props
	const { icon, onChange, placeholder, value } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapperBasic}>
			<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
			<TextInput style={styles.fieldBasic} value={value || ""} placeholder={placeholder} onChangeText={onChange} />
		</View>
	);
};

// export
export default InputText;
