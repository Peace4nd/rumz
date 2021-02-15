import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	item: {
		backgroundColor: Color.Light,
		borderColor: Color.Dark,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		color: Color.Dark,
		elevation: 2,
		marginBottom: Measurement.Padding,
		marginRight: Measurement.Padding,
		padding: Measurement.Padding / 2
	},
	itemGap: {},
	wrapper: {
		backgroundColor: "orange",
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap"
	}
});

export default styles;
