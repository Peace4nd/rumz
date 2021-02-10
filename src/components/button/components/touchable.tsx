import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IButton } from "..";
import { Icon } from "../..";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IButtonTouchable extends IButton {
	onPress: () => void;
}

/**
 * Klikaci tlacitko
 *
 * @param {IButton} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Touchable = (props: IButtonTouchable): JSX.Element => {
	// rozlozeni props
	const { icon, onPress } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			<TouchableOpacity onPress={onPress} style={styles.base}>
				<Icon icon={icon} />
			</TouchableOpacity>
		</View>
	);
};

export default Touchable;
