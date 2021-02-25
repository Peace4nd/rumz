import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	actionOption: {
		padding: 2 * Measurement.Padding
	},
	sectionAction: {
		alignItems: "center",
		justifyContent: "center",
		width: Measurement.Components.Header.Height
	},
	sectionTitle: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	title: {
		color: Color.Highlight
	},
	wrapper: {
		backgroundColor: Color.Base,
		elevation: 8,
		flexDirection: "row",
		height: Measurement.Components.Header.Height
	}
});

export default styles;
