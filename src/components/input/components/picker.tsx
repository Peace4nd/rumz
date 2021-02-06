import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Picker } from "@react-native-picker/picker";
import { PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import React from "react";
import { View } from "react-native";
import { IInput } from "..";
import { Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IInputPicker extends IInput<string> {
	items: PickerItemProps[];
}

/**
 * Vyberovy vstup
 */
class InputPicker extends React.Component<IInputPicker> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { icon, items, placeholder, value } = this.props;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapperBasic}>
				<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
				<Picker selectedValue={value} style={styles.fieldBasic} mode="dialog" prompt={placeholder} onValueChange={this.handleChange}>
					{items.map((item) => (
						<Picker.Item key={item.value} {...item} />
					))}
				</Picker>
				{!value && (
					<Typography type="Body1" style={[styles.placeholder, styles.placeholderOverlay]}>
						{placeholder}
					</Typography>
				)}
			</View>
		);
	}

	/**
	 * Zmena
	 *
	 * @param {string} value Hodnota
	 */
	private handleChange = (value: string): void => {
		this.props.onChange(value, true);
	};
}

// export
export default InputPicker;
