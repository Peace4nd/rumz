import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	icon: {
		marginRight: Measurement.Padding
	},
	label: {
		color: Color.Highlight
	},
	wrapper: {
		alignItems: "center",
		backgroundColor: Color.Base,
		borderRadius: Measurement.Radius / 2,
		elevation: 2,
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: 2 * Measurement.Padding,
		paddingVertical: Measurement.Padding
	}
});

export default styles;
