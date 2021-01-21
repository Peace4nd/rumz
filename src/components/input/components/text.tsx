import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "../styles";

export interface IInputText {
	placeholder: string;
	icon: IconDefinition;
}

const Input = (props: IInputText): JSX.Element => {
	const { icon, placeholder } = props;

	return (
		<View style={styles.wrapper}>
			<FontAwesomeIcon style={styles.icon} icon={icon} size={24} />
			<TextInput style={styles.text} placeholder={placeholder} />
		</View>
	);
};

export default Input;
