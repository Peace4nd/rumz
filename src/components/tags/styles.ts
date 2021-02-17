import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	item: {
		backgroundColor: Color.Light,
		borderColor: Color.Dark,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 1,
		marginBottom: Measurement.Padding,
		marginRight: Measurement.Padding,
		padding: Measurement.Padding / 2
	},
	label: {
		color: Color.Dark
	},
	wrapper: {
		flexDirection: "row",
		flexWrap: "wrap"
	}
});

export default styles;
