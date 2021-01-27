import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link as RouterLink } from "react-router-native";
import { IButton } from "..";
import { Measurement } from "../../../styles";
import { IRouterPath } from "../../../utils/router";
import styles from "../styles";

/**
 * Dostupne vlastnosti
 */
export interface IButtonLink extends IButton {
	to: IRouterPath;
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
				<FontAwesomeIcon icon={icon} style={styles.icon} size={size || Measurement.Icon} />
			</RouterLink>
		</View>
	);
};

export default Link;
