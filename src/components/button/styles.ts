import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	icon: {
		color: Color.Secondary.Text
	},
	wrapper: {
		height: Measurement.Button,
		width: Measurement.Button
	}
});

export default styles;
