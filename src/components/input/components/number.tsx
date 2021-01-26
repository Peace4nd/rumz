import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { IInput } from "..";
import { Color, Measurement } from "../../../styles";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export type IInputNumber = IInput<number>;

/**
 * Ciselny vstup
 */
class InputNumber extends React.Component<IInputNumber> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, onChange, placeholder, value } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapperBasic}>
				<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
				<TextInput
					style={styles.fieldBasic}
					value={value !== null ? String(value) : ""}
					placeholder={placeholder}
					placeholderTextColor={Color.Primary.Muted}
					keyboardType="numeric"
					onChangeText={(text) => {
						const parsed = parseFloat(text);
						onChange(isNaN(parsed) ? null : parsed);
					}}
				/>
			</View>
		);
	}
}

// export
export default InputNumber;
