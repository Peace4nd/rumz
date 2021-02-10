import { StyleSheet } from "react-native";
import { Measurement } from "../../styles";

const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	wrapper: {
		height: Measurement.Components.Button.Height,
		width: Measurement.Components.Button.Height
	}
});

export default styles;
