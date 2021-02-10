import { StyleSheet } from "react-native";
import { Color, Measurement, opacify } from "../../styles";

const styles = StyleSheet.create({
	indicator: {
		borderBottomColor: Color.Base,
		borderLeftColor: Color.Highlight,
		borderRadius: Measurement.Icon,
		borderRightColor: Color.Base,
		borderTopColor: Color.Base,
		borderWidth: 4,
		height: Measurement.Icon * 2,
		width: Measurement.Icon * 2
	},
	wrapper: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		backgroundColor: opacify(Color.Highlight, 0.75),
		justifyContent: "center"
	}
});

export default styles;
