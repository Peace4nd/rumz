import { StyleSheet } from "react-native";
import { Color, Typography } from "../../styles";

export const styles = StyleSheet.create({
	icon: {
		color: Color.Primary.Text
	},
	sectionAction: {
		alignItems: "flex-end",
		flex: 1,
		justifyContent: "center"
	},
	sectionBack: {
		alignItems: "flex-start",
		flex: 1,
		justifyContent: "center"
	},
	sectionTitle: {
		alignItems: "center",
		flex: 2,
		justifyContent: "center"
	},
	title: {
		...Typography.Headline6,
		color: Color.Primary.Text
	},
	wrapper: {
		backgroundColor: Color.Primary.Base,
		flexDirection: "row",
		height: 48,
		paddingHorizontal: 8
	}
});

export default styles;
