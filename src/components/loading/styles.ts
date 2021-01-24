import { StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const styles = StyleSheet.create({
	indicator: {
		borderBottomColor: Color.Secondary.Base,
		borderLeftColor: Color.White,
		borderRadius: Measurement.Icon,
		borderRightColor: Color.Secondary.Base,
		borderTopColor: Color.Secondary.Base,
		borderWidth: 4,
		height: Measurement.Icon * 2,
		width: Measurement.Icon * 2
	},
	wrapper: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		backgroundColor: Color.White,
		justifyContent: "center"
	}
});

export default styles;
