import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	tab: {
		alignItems: "center",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center"
	},
	tabActive: {
		color: Color.Primary.Text
	},
	tabIcon: {
		color: Color.Primary.Dark
	},
	tabText: {
		color: Color.Primary.Dark,
		marginTop: 8
	},
	wrapper: {
		backgroundColor: Color.Primary.Base,
		elevation: 8,
		flexDirection: "row",
		height: Measurement.Navigation,
		justifyContent: "space-evenly"
	}
});

export default styles;
