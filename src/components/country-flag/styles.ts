import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	flagWrapper: {
		alignItems: "center",
		backgroundColor: Color.Highlight,
		borderColor: Color.Muted,
		borderRadius: Measurement.Radius / 2,
		borderWidth: StyleSheet.hairlineWidth,
		height: (Measurement.Icon * 2) / 1.5,
		justifyContent: "center",
		overflow: "hidden",
		width: Measurement.Icon * 2
	}
});

export default styles;
