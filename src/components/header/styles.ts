import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	icon: {
		color: Color.Primary.Text
	},
	sectionAction: {
		alignItems: "center",
		justifyContent: "center",
		width: Measurement.Header
	},
	sectionTitle: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	title: {
		color: Color.Primary.Text
	},
	wrapper: {
		backgroundColor: Color.Primary.Base,
		elevation: 8,
		flexDirection: "row",
		height: Measurement.Header
	}
});

export default styles;
