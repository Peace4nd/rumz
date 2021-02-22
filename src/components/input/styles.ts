import { Dimensions, StyleSheet } from "react-native";
import { Color, Measurement, Size, Typography } from "../../styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	// tlacitko
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

	// chyba
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

	// pole
	fieldBasic: {
		...Typography.Body1,
		backgroundColor: Color.White,
		color: Color.Text,
		flex: 1,
		height: "100%",
		padding: 0,
		textAlignVertical: "center"
	},
	fieldCenter: {
		alignItems: "center",
		justifyContent: "center"
	},
	fieldMultiline: {
		paddingVertical: Measurement.Padding * 1.5,
		textAlignVertical: "top"
	},
	fieldPlaceholder: {
		color: Color.Muted
	},
	fieldTags: {
		flex: 1,
		paddingBottom: Measurement.Padding * 0.5,
		paddingTop: Measurement.Padding * 1.5
	},

	// ikona
	icon: {
		marginHorizontal: Measurement.Padding * 2,
		marginVertical: Measurement.Padding * 1.5
	},

	// obrazek
	image: {
		height: width / 2 - 2 * Measurement.Padding,
		width: width / 2 - 2 * Measurement.Padding
	},

	// placeholder
	placeholder: {
		color: Color.Muted,
		textAlign: "left",
		textAlignVertical: "center"
	},
	placeholderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.White,
		marginLeft: Size["7x"],
		marginRight: Size["6x"]
	},

	// wrapper
	wrapperBasic: {
		alignItems: "flex-start",
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		height: Measurement.Components.Input.Height,
		paddingHorizontal: Measurement.Padding * 2
	},
	wrapperButton: {
		paddingRight: Measurement.Components.Input.Height
	},
	wrapperCenter: {
		alignItems: "center"
	},
	wrapperError: {
		borderColor: "red",
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		marginTop: Measurement.Components.Input.Error
	},
	wrapperIcon: {
		paddingLeft: 0
	},
	wrapperImage: {
		alignItems: "center",
		backgroundColor: Color.White,
		height: width / 2,
		justifyContent: "center",
		marginHorizontal: width / 6
	},
	wrapperMultiline: {
		alignItems: "flex-start"
	},
	wrapperSpinner: {
		paddingRight: Measurement.Components.Input.Height * 2
	},
	wrapperSpring: {
		height: "auto",
		minHeight: Measurement.Components.Input.Height
	}
});

export default styles;
