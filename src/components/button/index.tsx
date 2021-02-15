import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "../icon";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IButton {
	/**
	 * Ikona
	 */
	icon?: IconDefinition;

	/**
	 * Popisek
	 */
	label?: string;

	/**
	 * Akce po stisknuti
	 */
	onPress?: () => void;
}

/**
 * Klikaci tlacitko
 *
 * @param {IButton} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Button = (props: IButton): JSX.Element => {
	// rozlozeni props
	const { icon, label, onPress } = props;
	// sestaveni a vraceni
	return (
		<TouchableOpacity style={styles.wrapper} onPress={onPress}>
			{icon && <Icon definition={icon} style={styles.icon} color="Highlight" size="2x" />}
			{label && (
				<Typography type="Button" style={styles.label}>
					{label}
				</Typography>
			)}
		</TouchableOpacity>
	);
};

export default Button;
