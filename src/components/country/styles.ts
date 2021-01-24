import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	flagWrapper: {
		alignItems: "center",
		backgroundColor: Color.White,
		height: Measurement.Icon / 1.5,
		justifyContent: "center",
		width: Measurement.Icon
	}
});

export default styles;
