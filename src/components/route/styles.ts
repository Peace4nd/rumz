import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	contentBusy: {
		alignItems: "center",
		justifyContent: "center"
	},
	contentPaddingFull: {
		padding: 2 * Measurement.Padding
	},
	contentPaddingHalf: {
		padding: Measurement.Padding
	},

	contentWrapper: {
		flex: 1
	},
	wrapper: {
		backgroundColor: Color.Highlight,
		flex: 1
	}
});

export default styles;
