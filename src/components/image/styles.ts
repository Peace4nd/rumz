import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1,
		flex: 1
	},
	wrapper: {
		alignItems: "center",
		aspectRatio: 1,
		backgroundColor: Color.White,
		borderColor: Color.Muted,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
		justifyContent: "center",
		overflow: "hidden",
		padding: 2 * Measurement.Padding,
		width: "100%"
	}
});

export default styles;
