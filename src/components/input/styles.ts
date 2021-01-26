import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement, Typography } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	error: {
		backgroundColor: "red",
		borderBottomLeftRadius: Measurement.Radius,
		borderBottomRightRadius: Measurement.Radius,
		bottom: -Measurement.Error,
		color: "white",
		height: Measurement.Error,
		left: -StyleSheet.hairlineWidth,
		paddingHorizontal: (Measurement.Input - Measurement.Icon) / 2,
		position: "absolute",
		right: -StyleSheet.hairlineWidth,
		textAlignVertical: "center"
	},
	fieldBasic: {
		...Typography.Body1,
		color: Color.Secondary.Text,
		flex: 1,
		paddingVertical: (Measurement.Input - Measurement.Icon) / 2,
		textAlignVertical: "center"
	},
	fieldMultiline: {
		textAlignVertical: "top"
	},
	fieldPlaceholder: {
		color: Color.Primary.Muted
	},
	iconBasic: {
		color: Color.Primary.Base,
		marginRight: (Measurement.Input - Measurement.Icon) / 2
	},
	iconBasicVertical: {
		marginBottom: (Measurement.Input - Measurement.Icon) / 2,
		marginRight: 0
	},
	iconMultiline: {
		marginTop: (Measurement.Input - Measurement.Icon) / 2
	},
	image: {
		height: width / 2 - 2 * Measurement.Padding,
		width: width / 2 - 2 * Measurement.Padding
	},
	placeholder: {
		color: Color.Primary.Muted,
		textAlign: "left",
		textAlignVertical: "center"
	},
	placeholderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.White,
		marginLeft: 48,
		marginRight: 48
	},
	wrapperBasic: {
		alignItems: "center",
		borderColor: Color.Primary.Light,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		marginBottom: Measurement.Padding * 2,
		minHeight: Measurement.Input,
		paddingHorizontal: (Measurement.Input - Measurement.Icon) / 2
	},
	wrapperError: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderColor: "red",
		marginBottom: Measurement.Error + Measurement.Padding * 2
	},
	wrapperFill: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
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
