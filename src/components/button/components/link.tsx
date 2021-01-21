import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link as RouterLink } from "react-router-native";
import { IButton } from "..";
import { IRouterAvailable } from "../../../utils/router";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IButtonLink extends IButton {
	to: IRouterAvailable;
}

/**
 * Routovaci tlacitko
 *
 * @param {IButton} props Vlastnosti
 * @returns {JSX.Element} Element
 */
const Link = (props: IButtonLink): JSX.Element => {
	// rozlozeni props
	const { icon, size, to } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			<RouterLink to={to} component={TouchableOpacity} style={styles.base}>
				<FontAwesomeIcon icon={icon} style={styles.icon} size={size || 24} />
			</RouterLink>
		</View>
	);
};

export default Link;
