import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	flagWrapper: {
		alignItems: "center",
		aspectRatio: 1.5,
		backgroundColor: Color.Highlight,
		borderRadius: Measurement.Radius / 2,
		height: "100%",
		justifyContent: "center",
		overflow: "hidden"
	}
});

export default styles;
