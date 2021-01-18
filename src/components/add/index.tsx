import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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

export default class Add extends React.Component {
	public render(): JSX.Element {
		return (
			<View style={styles.wrapper}>
				<TouchableOpacity style={styles.base}>
					<FontAwesomeIcon icon={faPlus} style={styles.icon} size={24} />
				</TouchableOpacity>
			</View>
		);
	}
}
