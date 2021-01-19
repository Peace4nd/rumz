import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "react-router-native";
import { Color, Size } from "../../styles";

export const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		backgroundColor: Color.Secondary.Base,
		borderRadius: Size["3x"],
		elevation: 5,
		height: Size["6x"],
		justifyContent: "center",
		width: Size["6x"]
	},
	icon: {
		color: Color.Secondary.Text
	},
	wrapper: {
		bottom: Size["3x"],
		position: "absolute",
		right: Size["3x"]
	}
});

export type IButtonType = "router" | "pressable";

export interface IButton {
	route?: string;
	icon: IconDefinition;
	size?: number;
}

const Button = (props: IButton): JSX.Element => {
	// rozlozeni props
	const { icon, route, size } = props;
	// sestaveni a vraceni
	return (
		<View style={styles.wrapper}>
			<Link to={route} component={TouchableOpacity} style={styles.base}>
				<FontAwesomeIcon icon={icon} style={styles.icon} size={size || 24} />
			</Link>
		</View>
	);
};

export default Button;
