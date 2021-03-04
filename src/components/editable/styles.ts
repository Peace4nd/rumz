import { StyleSheet } from "react-native";
import { Measurement } from "../../styles";

const styles = StyleSheet.create({
	label: {
		marginBottom: Measurement.Padding / 2
	},
	touchable: {
		flex: 1
	},
	wrapper: {
		flex: 1,
		width: "100%"
	}
});

export default styles;
