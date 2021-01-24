import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	fieldBasic: {
		flex: 1,
		paddingVertical: (Measurement.Input - Measurement.Icon) / 2,
		textAlignVertical: "center"
	},
	fieldMultiline: {
		textAlignVertical: "top"
	},
	iconBasic: {
		color: Color.Primary.Base,
		marginRight: (Measurement.Input - Measurement.Icon) / 2
	},
	iconMultiline: {
		marginTop: (Measurement.Input - Measurement.Icon) / 2
	},
	image: {
		height: width / 2 - 2 * Measurement.Padding,
		width: width / 2 - 2 * Measurement.Padding
	},
	placeholder: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.White,
		color: Color.Primary.Muted,
		marginLeft: 48,
		marginRight: 32,
		textAlignVertical: "center"
	},
	wrapperBasic: {
		alignItems: "center",
		borderColor: Color.Primary.Light,
		borderRadius: Measurement.Radius,
		borderWidth: 1,
		flexDirection: "row",
		marginBottom: 16,
		minHeight: Measurement.Input,
		paddingHorizontal: (Measurement.Input - Measurement.Icon) / 2
	},
	wrapperImage: {
		height: width / 2,
		justifyContent: "center",
		padding: Measurement.Padding,
		width: width / 2
	},
	wrapperMultiline: {
		alignItems: "flex-start"
	}
});

export default styles;
