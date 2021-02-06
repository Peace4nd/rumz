import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: Measurement.Padding * 2
	},
	wrapper: {
		backgroundColor: Color.White,
		flex: 1
	}
});

export default styles;
