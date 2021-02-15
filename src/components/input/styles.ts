import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement, Size, Typography } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	buttonElement: {
		alignItems: "center",
		aspectRatio: 1,
		height: Measurement.Components.Input.Height,
		justifyContent: "center"
	},
	buttonGroup: {
		bottom: 0,
		flexDirection: "row",
		position: "absolute",
		right: 0,
		top: 0
	},
	error: {
		backgroundColor: "red",
		borderTopLeftRadius: Measurement.Radius,
		borderTopRightRadius: Measurement.Radius,
		color: "white",
		height: Measurement.Components.Input.Error,
		left: -StyleSheet.hairlineWidth,
		paddingHorizontal: Measurement.Padding,
		position: "absolute",
		right: -StyleSheet.hairlineWidth,
		textAlignVertical: "center",
		top: -Measurement.Components.Input.Error
	},
	fieldBasic: {
		...Typography.Body1,
		color: Color.Text,
		flex: 1,
		height: "100%",
		textAlignVertical: "center"
	},
	fieldMultiline: {
		textAlignVertical: "top"
	},
	fieldPlaceholder: {
		color: Color.Muted
	},
	fieldTags: {
		alignItems: "flex-start",
		flex: 1,
		justifyContent: "center"
	},
	iconBasic: {
		marginRight: Measurement.Padding * 2
	},
	iconBasicVertical: {
		marginRight: 0
	},
	iconMultiline: {
		marginTop: 1.5 * 8
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
	placeholderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.Highlight,
		marginLeft: Size["6x"],
		marginRight: Size["6x"]
	},
	wrapperBasic: {
		alignItems: "center",
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		height: Measurement.Components.Input.Height,
		paddingHorizontal: Measurement.Padding * 2
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
	wrapperImage: {
		height: width / 2,
		justifyContent: "center",
		marginHorizontal: width / 6
	},
	wrapperSpinner: {
		paddingRight: Measurement.Components.Input.Height * 2
	},
	wrapperSpring: {
		height: "auto",
		minHeight: Measurement.Components.Input.Height
	},
	wrapperTags: {
		paddingRight: Measurement.Components.Input.Height
	}
});

export default styles;
