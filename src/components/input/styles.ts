import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement, Typography } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	error: {
		backgroundColor: "red",
		borderTopLeftRadius: Measurement.Radius,
		borderTopRightRadius: Measurement.Radius,
		color: "white",
		height: Measurement.Components.Input.Error,
		left: -StyleSheet.hairlineWidth,
		paddingHorizontal: (Measurement.Components.Input.Height - Measurement.Icon) / 2,
		position: "absolute",
		right: -StyleSheet.hairlineWidth,
		textAlignVertical: "center",
		top: -Measurement.Components.Input.Error
	},
	fieldBasic: {
		...Typography.Body1,
		color: Color.Text,
		flex: 1,
		paddingVertical: (Measurement.Components.Input.Height - Measurement.Icon) / 2,
		textAlignVertical: "center"
	},
	fieldMultiline: {
		textAlignVertical: "top"
	},
	fieldPlaceholder: {
		color: Color.Muted
	},
	iconBasic: {
		marginRight: (Measurement.Components.Input.Height - Measurement.Icon) / 2
	},
	iconBasicVertical: {
		marginBottom: (Measurement.Components.Input.Height - Measurement.Icon) / 2,
		marginRight: 0
	},
	iconMultiline: {
		marginTop: (Measurement.Components.Input.Height - Measurement.Icon) / 2
	},
	image: {
		height: width / 2 - 2 * Measurement.Padding,
		width: width / 2 - 2 * Measurement.Padding
	},
	placeholder: {
		color: Color.Muted,
		textAlign: "left",
		textAlignVertical: "center"
	},
	placeholderHighlight: {
		backgroundColor: Color.Light
	},
	placeholderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.Highlight,
		marginLeft: 48,
		marginRight: 48
	},
	wrapperBasic: {
		alignItems: "center",
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		height: Measurement.Components.Input.Height,
		paddingHorizontal: (Measurement.Components.Input.Height - Measurement.Icon) / 2
	},
	wrapperError: {
		borderColor: "red",
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		marginTop: Measurement.Components.Input.Error
	},
	wrapperFill: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	wrapperHighlight: {
		backgroundColor: Color.Light,
		borderColor: Color.Base
	},
	wrapperImage: {
		height: width / 2,
		justifyContent: "center",
		marginHorizontal: width / 6,
		padding: Measurement.Padding
	},
	wrapperMultiline: {
		alignItems: "flex-start",
		height: "auto",
		minHeight: Measurement.Components.Input.Height
	}
});

export default styles;
