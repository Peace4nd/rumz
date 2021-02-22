import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	wrapper: {
		alignItems: "center",
		borderBottomColor: Color.Base,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Measurement.Padding,
		paddingBottom: Measurement.Padding,
		width: "100%"
	}
});

export default styles;
