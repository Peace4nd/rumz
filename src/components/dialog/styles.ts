import { StyleSheet } from "react-native";
import { Color, Measurement, opacify } from "../../styles";

const styles = StyleSheet.create({
	contentChildren: {
		alignItems: "center",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center"
	},
	contentTitle: {
		alignItems: "center",
		borderBottomColor: Color.Base,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Measurement.Padding,
		paddingBottom: Measurement.Padding,
		width: "100%"
	},
	contentWrapper: {
		alignItems: "center",
		aspectRatio: 1.5,
		backgroundColor: Color.Highlight,
		borderRadius: Measurement.Radius,
		elevation: 8,
		flexDirection: "column",
		justifyContent: "center",
		margin: Measurement.Padding,
		padding: Measurement.Padding,
		width: "75%"
	},
	contentWrapperFullscreen: {
		elevation: null
	},
	wrapper: {
		alignItems: "center",
		backgroundColor: opacify(Color.Text, 0.5),
		flex: 1,
		justifyContent: "center"
	},
	wrapperFullscreen: {
		backgroundColor: Color.Highlight
	}
});

export default styles;
