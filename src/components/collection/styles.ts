import { StyleSheet } from "react-native";
import { Color, Measurement, Size } from "../../styles";

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1,
		flex: 0,
		height: "100%"
	},
	info: {
		flex: 1,
		flexDirection: "column",
		padding: Measurement.Padding
	},
	infoAdditional: {
		alignItems: "center",
		flex: 0,
		flexDirection: "row",
		height: Size["4x"],
		justifyContent: "space-between",
		marginTop: Measurement.Padding
	},
	infoManufacturer: {
		flex: 1,
		marginTop: Measurement.Padding
	},
	infoName: {
		flex: 0
	},
	infoPortions: {
		alignItems: "center",
		backgroundColor: Color.Light,
		borderRadius: Measurement.Radius / 2,
		flexDirection: "row",
		justifyContent: "center",
		padding: Measurement.Padding
	},
	infoPortionsIcon: {
		marginRight: Measurement.Padding
	},
	infoRipening: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center"
	},
	infoSubname: {
		color: Color.Muted,
		flex: 0,
		marginTop: Measurement.Padding / 2
	},
	status: {
		bottom: 0,
		height: Size["1x"],
		left: 0,
		position: "absolute",
		right: 0
	},
	statusComplete: {
		backgroundColor: Color.Base
	},
	statusIncomplete: {
		backgroundColor: Color.Muted
	},
	wrapper: {
		backgroundColor: Color.White,
		borderColor: Color.Base,
		borderRadius: Measurement.Radius,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 4,
		flex: 1,
		flexDirection: "row",
		height: Measurement.Components.Collection.Height,
		overflow: "hidden",
		padding: Measurement.Padding,
		paddingBottom: Measurement.Padding + Size["1x"]
	},
	wrapperPressed: {
		opacity: 0.2
	}
});

export default styles;
