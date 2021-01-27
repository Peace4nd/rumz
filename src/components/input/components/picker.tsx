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
 *
 * @param {IInputPicker} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const InputPicker = (props: IInputPicker): JSX.Element => {
	// rozlozeni props
	const { icon, items, onChange, placeholder, value } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapperBasic}>
			<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
			<Picker selectedValue={value} style={styles.fieldBasic} mode="dialog" prompt={placeholder} onValueChange={onChange}>
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
};

// export
export default InputPicker;
