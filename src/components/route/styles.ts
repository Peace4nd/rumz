import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: Measurement.Padding
	},
	contentBusy: {
		alignItems: "center",
		justifyContent: "center"
	},
	wrapper: {
		backgroundColor: Color.Highlight,
		flex: 1
	}
});

export default styles;
