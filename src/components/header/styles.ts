import { StyleSheet } from "react-native";
import { Color, Measurement, Typography } from "../../styles";

const styles = StyleSheet.create({
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
		elevation: 8,
		flexDirection: "row",
		height: Measurement.Header,
		padding: 8
	}
});

export default styles;
