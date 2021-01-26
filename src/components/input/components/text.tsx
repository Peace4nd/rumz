import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IInput } from "..";
import { Color, Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export type IInputText = IInput<string>;

/**
 * Textovy vstup
 *
 * @param {IInputText} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const InputText = (props: IInputText): JSX.Element => {
	// rozlozeni props
	const { error, icon, onChange, placeholder, value } = props;
	// sestaveni a vraceni
	return (
		<View style={StyleSheet.flatten([styles.wrapperBasic, error ? styles.wrapperError : null])}>
			<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
			<TextInput
				style={styles.fieldBasic}
				value={value || ""}
				placeholder={placeholder}
				placeholderTextColor={Color.Primary.Muted}
				onChangeText={onChange}
			/>
			{error && (
				<Typography type="Subtitle2" style={styles.error}>
					{error}
				</Typography>
			)}
		</View>
	);
};

// export
export default InputText;
