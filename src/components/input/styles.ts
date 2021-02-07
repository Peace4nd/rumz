import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement, Typography } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	error: {
		backgroundColor: "red",
		borderTopLeftRadius: Measurement.Radius,
		borderTopRightRadius: Measurement.Radius,
		color: "white",
		height: Measurement.Error,
		left: -StyleSheet.hairlineWidth,
		paddingHorizontal: (Measurement.Input - Measurement.Icon) / 2,
		position: "absolute",
		right: -StyleSheet.hairlineWidth,
		textAlignVertical: "center",
		top: -Measurement.Error
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
	placeholderHighlight: {
		backgroundColor: Color.Secondary.Light
	},
	placeholderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.White,
		marginLeft: 48,
		marginRight: 48
	},
	wrapperBasic: {
		alignItems: "center",
		borderColor: Color.Primary.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		minHeight: Measurement.Input,
		paddingHorizontal: (Measurement.Input - Measurement.Icon) / 2
	},
	wrapperError: {
		borderColor: "red",
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		marginTop: Measurement.Error
	},
	wrapperFill: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	wrapperHighlight: {
		backgroundColor: Color.Secondary.Light,
		borderColor: Color.Secondary.Base
	},
	wrapperImage: {
		height: width / 2,
		justifyContent: "center",
		marginHorizontal: width / 6,
		padding: Measurement.Padding
	},
	wrapperMultiline: {
		alignItems: "flex-start"
	}
});

export default styles;
