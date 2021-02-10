import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link as RouterLink } from "react-router-native";
import { IButton } from "..";
import { Icon } from "../..";
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
	const { icon, to } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			<RouterLink to={to} component={TouchableOpacity} style={styles.base}>
				<Icon icon={icon} />
			</RouterLink>
		</View>
	);
};

export default Link;
