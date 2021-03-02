import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	image: {
		flex: 1
	},
	wrapper: {
		borderColor: Color.Muted,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		height: width - 4 * Measurement.Padding,
		overflow: "hidden",
		width: width - 4 * Measurement.Padding
	}
});

export default styles;
