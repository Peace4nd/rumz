import { StyleSheet } from "react-native";
import { Color } from "../../styles";

export const styles = StyleSheet.create({
	tab: {
		alignItems: "center",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center"
	},
	tabActive: {
		color: Color.Primary.Text
		// color: Color.Primary.Light
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
		flexDirection: "row",
		height: 80,
		justifyContent: "space-evenly"
	}
});

export default styles;
